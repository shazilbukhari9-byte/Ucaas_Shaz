/**
 * The demo form's field UX, shared by the demo section and the get-started
 * modal — the original ships the identical function in both bundles.
 *
 * It is presentation, not submission: per-field validation messages, the
 * completion tick, a phone mask, and the two-column layout classes the
 * stylesheet keys off. The capture's form posted to Nextiva's HubSpot portal;
 * the generator strips that endpoint and its hidden attribution fields, so the
 * form here validates and then does nothing.
 */

const FIELD_NAMES = ['firstname', 'lastname', 'email', 'company', 'phone', 'numberofemployees'];

const MESSAGES = {
  firstname: { missing: 'Please enter your first name', invalid: 'Please enter your first name' },
  lastname: { missing: 'Please enter your last name', invalid: 'Please enter your last name' },
  email: { missing: 'Please enter your email', invalid: 'Please enter a valid email address' },
  company: { missing: 'Please enter your company name', invalid: 'Please enter your company name' },
  phone: { missing: 'Please enter your phone number', invalid: 'Please enter a valid 10-digit phone number' },
  numberofemployees: { missing: 'Please enter the number of employees', invalid: 'Please enter the number of employees' },
};

const CHECK_SVG =
  '<svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<path d="M2 5.5L4 7.5L8 3" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
const fieldWrap = (input) => (input ? input.closest('.hs-form-field') : null);
const hasValue = (input) => Boolean(input && input.value.trim().length);

/** A field the visitor can actually see — HubSpot hides the ones it does not need. */
function isVisible(input) {
  if (!input || input.type === 'hidden') return false;
  const wrap = fieldWrap(input) || input;
  if ((wrap.getAttribute('style') || '').toLowerCase().includes('display: none')) return false;
  const style = getComputedStyle(wrap);
  return style.display !== 'none' && style.visibility !== 'hidden';
}

function validate(input) {
  if (!input || !isVisible(input)) return '';
  const value = input.value.trim();
  const copy = MESSAGES[input.name];
  if (!copy) return '';

  if (input.name === 'phone') {
    const digits = input.value.replace(/\D/g, '');
    if (!digits) return copy.missing;
    return digits.length === 10 ? '' : copy.invalid;
  }
  if (input.name === 'numberofemployees') {
    const count = parseInt(value, 10);
    return value === '' || Number.isNaN(count) || count < 1 ? copy.missing : '';
  }
  if (!value) return copy.missing;
  if (input.name === 'email') return isEmail(value) ? '' : copy.invalid;
  return value.length < 2 ? copy.invalid : '';
}

function clearError(input) {
  if (!input) return;
  input.classList.remove('demo-field-error');
  const wrap = fieldWrap(input);
  if (!wrap || !wrap.classList.contains('demo-custom-error')) return;

  wrap.classList.remove('hs-error', 'demo-custom-error');
  const message = wrap.querySelector('.demo-error-message');
  if (message) {
    message.textContent = '';
    message.classList.remove('is-visible');
  }
  wrap.querySelectorAll('[data-demo-native-error-hidden="1"]').forEach((el) => {
    el.style.display = '';
    delete el.dataset.demoNativeErrorHidden;
  });
}

function showError(input, text) {
  if (!input) return;
  input.classList.add('demo-field-error');
  const wrap = fieldWrap(input);
  if (!wrap) return;

  wrap.classList.add('hs-error', 'demo-custom-error');
  wrap.classList.remove('is-complete');

  let message = wrap.querySelector('.demo-error-message');
  if (!message) {
    message = document.createElement('div');
    message.className = 'demo-error-message';
    wrap.appendChild(message);
  }
  // HubSpot's own message would sit alongside this one, saying the same thing.
  wrap.querySelectorAll('.input.error-ct span.invalid.error.red').forEach((el) => {
    el.dataset.demoNativeErrorHidden = '1';
    el.style.display = 'none';
  });
  message.textContent = text;
  message.classList.add('is-visible');
}

function markComplete(input) {
  const wrap = fieldWrap(input);
  if (!wrap) return;
  const filled = isVisible(input) && input.value.trim() !== '' && !validate(input);
  wrap.classList.toggle('is-complete', filled);
}

function check(input) {
  if (!input) return true;
  clearError(input);
  if (!isVisible(input)) {
    markComplete(input);
    return true;
  }
  const problem = validate(input);
  if (problem) {
    showError(input, problem);
    markComplete(input);
    return false;
  }
  markComplete(input);
  return true;
}

const fieldsOf = (form) => FIELD_NAMES.map((n) => form.querySelector(`[name="${n}"]`)).filter(Boolean);

/** Fieldsets whose every field is hidden collapse, so the grid does not gap. */
function collapseEmptyFieldsets(form) {
  form.querySelectorAll('fieldset').forEach((set) => {
    const fields = Array.from(set.querySelectorAll('.hs-form-field'));
    if (!fields.length) return;
    const anyVisible = fields.some(
      (f) => !(f.getAttribute('style') || '').toLowerCase().includes('display: none') &&
        getComputedStyle(f).display !== 'none'
    );
    set.classList.toggle('is-hidden-fieldset', !anyVisible);
  });
}

/** Two columns when more than one field shows; a lone odd field spans the row. */
function layoutColumns(form) {
  const fields = Array.from(form.querySelectorAll('.hs-form-field'));
  const visible = fields.filter((f) =>
    Array.from(f.querySelectorAll('input, select, textarea')).some(isVisible)
  );
  fields.forEach((f) => f.classList.remove('demo-field-full-row'));
  form.classList.toggle('demo-two-column-fields', visible.length > 1);
  if (visible.length && visible.length % 2 === 1) {
    visible[visible.length - 1].classList.add('demo-field-full-row');
  }
}

function decorate(form) {
  layoutColumns(form);
  const fields = fieldsOf(form);
  if (!fields.length) return;

  fields.forEach((input) => {
    fieldWrap(input)?.classList.add('demo-field');
    const host = input.closest('.input') || input.parentElement || fieldWrap(input);
    if (host && !host.querySelector('.demo-field-check')) {
      const tick = document.createElement('span');
      tick.className = 'demo-field-check';
      tick.innerHTML = CHECK_SVG;
      host.appendChild(tick);
    }
    markComplete(input);
  });

  const phone = form.querySelector('[name="phone"]');
  if (phone && phone.dataset.demoPhoneMaskReady !== '1') {
    phone.dataset.demoPhoneMaskReady = '1';
    phone.setAttribute('autocomplete', 'off');
    phone.addEventListener('input', function mask() {
      const digits = this.value.replace(/\D/g, '').substring(0, 10);
      if (digits.length <= 3) {
        this.value = digits;
        return;
      }
      const tail = digits.substring(6, 10);
      this.value = `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}${tail ? `-${tail}` : ''}`;
    });
  }

  const employees = form.querySelector('[name="numberofemployees"]');
  if (employees && employees.dataset.demoEmployeesReady !== '1') {
    employees.dataset.demoEmployeesReady = '1';
    employees.addEventListener('input', function floor() {
      if (this.value !== '' && parseInt(this.value, 10) < 1) this.value = '1';
    });
    employees.addEventListener('keydown', (event) => {
      if (event.key === '-' || event.key === 'e') event.preventDefault();
    });
  }
}

function bind(form) {
  if (form.dataset.demoValidationReady === '1') {
    collapseEmptyFieldsets(form);
    layoutColumns(form);
    return;
  }
  form.dataset.demoValidationReady = '1';

  const submitted = () => form.dataset.demoSubmitted === '1';
  const settle = (target) => {
    if (hasValue(target) || submitted()) {
      target.dataset.demoTouched = '1';
      check(target);
    } else {
      clearError(target);
      markComplete(target);
    }
  };

  // An untouched, empty field should not keep its floating label raised.
  form.addEventListener('blur', (event) => {
    const el = event.target;
    if (!el.matches('input, select, textarea') || hasValue(el) || submitted()) return;
    el.closest('.hs-form-field')?.querySelector('label')?.classList.remove('active', 'focus-label');
  }, true);

  form.addEventListener('focusout', (event) => {
    const el = event.target;
    if (el.matches('input, select, textarea') && !hasValue(el) && !submitted()) event.stopPropagation();
  }, true);

  ['focusout', 'input', 'change'].forEach((type) => {
    form.addEventListener(type, (event) => {
      if (event.target.matches('input, select, textarea')) settle(event.target);
    });
  });

  const validateAll = () => {
    form.dataset.demoSubmitted = '1';
    return fieldsOf(form).reduce((ok, input) => {
      input.dataset.demoTouched = '1';
      return check(input) && ok;
    }, true);
  };

  const guard = (event) => {
    if (validateAll()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  form.querySelector('input[type="submit"], button[type="submit"]')?.addEventListener('click', guard, true);
  form.addEventListener('submit', guard, true);

  collapseEmptyFieldsets(form);
  layoutColumns(form);
}

/**
 * Wires the form inside `container`. Returns a cleanup for the observer that
 * keeps the layout classes right as HubSpot-style markup shows and hides
 * fields.
 */
export default function enhanceDemoForm(container) {
  if (!container || !container.nodeType) return () => {};
  if (container.dataset.demoWatchReady === '1') return () => {};
  container.dataset.demoWatchReady = '1';

  const formOf = () => container.querySelector('form.hs-form') || container.querySelector('form');

  const apply = () => {
    const form = formOf();
    if (!form) return;
    decorate(form);
    bind(form);
  };
  apply();

  const observer = new MutationObserver(() => {
    apply();
    const form = formOf();
    if (!form) return;
    collapseEmptyFieldsets(form);
    layoutColumns(form);
  });
  observer.observe(container, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    delete container.dataset.demoWatchReady;
  };
}
