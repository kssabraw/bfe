/**
 * Lead-magnet popup: opens on a timer, on scroll depth, on exit intent, or on
 * demand from any element with `data-lead-magnet-open`. Submits to Web3Forms
 * like the other forms on the site (see forms.js).
 *
 * Suppression is stored in localStorage:
 *   bfe_lm_done      — visitor converted, never show again
 *   bfe_lm_dismissed — timestamp of last dismissal, quiet for `dismissDays`
 */
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const DONE_KEY = 'bfe_lm_done';
const DISMISSED_KEY = 'bfe_lm_dismissed';

const modal = document.getElementById('lead-magnet');

if (modal) {
  const dialog = modal.querySelector('.lm__dialog');
  const form = document.getElementById('lead-magnet-form');
  const offer = modal.querySelector('[data-lead-magnet-offer]');
  const success = modal.querySelector('[data-lead-magnet-success]');
  const successText = modal.querySelector('[data-lead-magnet-success-text]');
  const download = modal.querySelector('[data-lead-magnet-download]');
  const assetUrl = modal.dataset.assetUrl || '';
  const dismissDays = Number(modal.dataset.dismissDays) || 0;

  let lastFocused = null;

  /* ---- storage helpers (private mode can throw) ---- */
  const read = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };
  const write = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  };

  const suppressed = () => {
    if (read(DONE_KEY)) return true;
    const dismissed = Number(read(DISMISSED_KEY));
    if (!dismissed) return false;
    return Date.now() - dismissed < dismissDays * 86400000;
  };

  /* ---- open / close ---- */
  const open = () => {
    if (!modal.hidden) return;
    teardownTriggers();
    lastFocused = document.activeElement;
    const source = form?.querySelector('[data-lead-magnet-source]');
    if (source) source.value = window.location.pathname;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    (dialog.querySelector('input:not([type="hidden"]):not([type="checkbox"])') || dialog).focus();
  };

  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (!read(DONE_KEY)) write(DISMISSED_KEY, String(Date.now()));
    lastFocused?.focus?.();
  };

  modal.querySelectorAll('[data-lead-magnet-close]').forEach((el) => {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    // Keep focus inside the dialog while it is open.
    const focusable = [
      ...dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"])'
      ),
    ].filter((el) => !el.closest('[hidden]') && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // Manual triggers work regardless of suppression — the visitor asked for it.
  document.querySelectorAll('[data-lead-magnet-open]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  /* ---- automatic triggers ---- */
  let timerId = null;
  const onScroll = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const percent = (window.scrollY / scrollable) * 100;
    if (percent >= Number(modal.dataset.scroll)) open();
  };
  const onExitIntent = (e) => {
    if (e.clientY <= 0 && !e.relatedTarget) open();
  };

  function teardownTriggers() {
    clearTimeout(timerId);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('mouseout', onExitIntent);
  }

  if (!suppressed()) {
    const delay = Number(modal.dataset.delay);
    if (delay > 0) timerId = setTimeout(open, delay * 1000);
    if (Number(modal.dataset.scroll) > 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }
    // Exit intent needs a real cursor — skip it on touch devices.
    if (modal.dataset.exitIntent === 'true' && window.matchMedia('(hover: hover)').matches) {
      document.addEventListener('mouseout', onExitIntent);
    }
  }

  /* ---- submit ---- */
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const msg = form.querySelector('.form-message');
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    msg.textContent = '';
    msg.className = 'form-message';

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || `HTTP ${res.status}`);

      write(DONE_KEY, '1');
      if (typeof window.fbq === 'function') window.fbq('track', 'Lead');

      successText.textContent = assetUrl
        ? 'Your download is ready — we sent a copy to your inbox too.'
        : 'Check your inbox — your copy is on the way.';
      if (assetUrl) download.hidden = false;
      offer.hidden = true;
      success.hidden = false;
      (assetUrl ? download : success.querySelector('[data-lead-magnet-close]')).focus();
    } catch {
      btn.disabled = false;
      btn.textContent = label;
      msg.textContent = 'Something went wrong. Please try again.';
      msg.className = 'form-message form-message--error';
    }
  });
}
