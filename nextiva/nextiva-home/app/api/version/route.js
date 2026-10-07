// The id of the build that is live right now. An open tab compares it with
// the id it was loaded with (see components/UpdateNotice.jsx) to know a newer
// deploy has gone out. Route handlers aren't cached by default; the header
// also keeps browsers and the CDN from holding on to an old answer.
export async function GET() {
  return new Response(JSON.stringify({ id: process.env.NEXT_PUBLIC_BUILD_ID || '' }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
