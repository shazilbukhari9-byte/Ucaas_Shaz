/* User store for the auth API.

   - With Upstash Redis / Vercel KV credentials in the environment
     (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL +
     KV_REST_API_TOKEN) users are kept in Redis — this is what production
     should use.
   - Otherwise users go to a JSON file: data/users.json in development. On a
     serverless host without Redis the only writable place is /tmp, which is
     wiped between cold starts, so accounts there do not persist — a warning
     is logged once. */
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const key = (email) => `ucaas:user:${email}`;

/* ── Redis (REST) ─────────────────────────────────────────────────────── */
async function redis(cmd) {
  const res = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`User store error (${res.status})`);
  const data = await res.json();
  if (data.error) throw new Error(`User store error: ${data.error}`);
  return data.result;
}

/* ── JSON file ────────────────────────────────────────────────────────── */
const onServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const FILE = onServerless
  ? path.join(os.tmpdir(), 'ucaas-users.json')
  : path.join(process.cwd(), 'data', 'users.json');
let warned = false;
let queue = Promise.resolve();

async function readFile() {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8'));
  } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
}

async function writeFile(all) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(all, null, 2));
  await fs.rename(tmp, FILE);
}

function warnOnce() {
  if (onServerless && !warned) {
    warned = true;
    console.warn('[auth] No Redis/KV configured — accounts are stored in /tmp and will not persist. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.');
  }
}

/* ── API ──────────────────────────────────────────────────────────────── */
export async function getUser(email) {
  if (useRedis) {
    const raw = await redis(['GET', key(email)]);
    return raw ? JSON.parse(raw) : null;
  }
  warnOnce();
  const all = await readFile();
  return all[email] || null;
}

/** Creates the user; returns false if the email is already taken. */
export async function createUser(user) {
  if (useRedis) {
    const ok = await redis(['SET', key(user.email), JSON.stringify(user), 'NX']);
    return ok === 'OK';
  }
  warnOnce();
  // Serialise file writes so two sign-ups can't clobber each other.
  const run = queue.then(async () => {
    const all = await readFile();
    if (all[user.email]) return false;
    all[user.email] = user;
    await writeFile(all);
    return true;
  });
  queue = run.catch(() => {});
  return run;
}

export async function updateUser(email, patch) {
  const current = await getUser(email);
  if (!current) return null;
  const next = { ...current, ...patch };
  if (useRedis) {
    await redis(['SET', key(email), JSON.stringify(next)]);
    return next;
  }
  const run = queue.then(async () => {
    const all = await readFile();
    all[email] = next;
    await writeFile(all);
    return next;
  });
  queue = run.catch(() => {});
  return run;
}
