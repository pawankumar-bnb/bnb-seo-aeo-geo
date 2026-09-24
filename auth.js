/* ═══════════════════════════════════════════════════════════════════════════
   Domain gate — @bricknbolt.com only.

   READ THIS BEFORE RELYING ON IT.

   This is a client-side access check, not a security control. The page, its
   styles and data.js are all served as public static files, so anyone who
   skips this page can still read everything behind it. It exists to keep the
   survey out of general circulation and to make clear the page is internal —
   it does not protect anything.

   Deliberately no password field. Asking for one here would train people to
   type a real corporate password into a static page that cannot verify it,
   which is worse than no gate at all. Email domain only.

   For an actual control, put the site behind something that checks identity
   on the server — Cloudflare Access, Netlify Identity or Vercel with SSO —
   and make the repository private. See README.
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const ALLOWED_DOMAIN = 'bricknbolt.com';
  const STORE_KEY = 'bnb-snag-access';

  const lock = document.getElementById('lockscreen');
  const app = document.getElementById('app');
  const form = document.getElementById('lock-form');
  const input = document.getElementById('lock-email');
  const err = document.getElementById('lock-err');
  const who = document.getElementById('lock-who');
  const signout = document.getElementById('signout');

  if (!lock || !app || !form || !input) return;

  const normalise = (s) => String(s == null ? '' : s).trim().toLowerCase();

  // Anchored on both ends, so name@bricknbolt.com.example.org does not pass.
  const PATTERN = new RegExp('^[^\\s@]+@' + ALLOWED_DOMAIN.replace(/\./g, '\\.') + '$');
  const isAllowed = (email) => PATTERN.test(normalise(email));

  // localStorage can be empty or throw — a private window, blocked site data,
  // a preview frame. The gate must still work, just without remembering.
  const store = {
    get() {
      try { return localStorage.getItem(STORE_KEY); } catch { return null; }
    },
    set(v) {
      try { localStorage.setItem(STORE_KEY, v); } catch { /* not remembered */ }
    },
    clear() {
      try { localStorage.removeItem(STORE_KEY); } catch { /* nothing to clear */ }
    },
  };

  function unlock(email, remember) {
    if (remember) store.set(email);
    if (who) who.textContent = email;
    lock.hidden = true;
    app.hidden = false;
    document.body.classList.remove('is-locked');
    window.BNB_UNLOCKED = true;
    document.dispatchEvent(new CustomEvent('bnb:unlock', { detail: { email } }));
  }

  function relock() {
    store.clear();
    window.BNB_UNLOCKED = false;
    app.hidden = true;
    lock.hidden = false;
    document.body.classList.add('is-locked');
    input.value = '';
    showError('');
    input.focus();
  }

  function showError(msg) {
    if (!err) return;
    err.textContent = msg;
    err.hidden = !msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // a static page has nowhere to submit to
    const email = normalise(input.value);

    if (!email) {
      showError('Enter your work email address.');
      input.focus();
      return;
    }
    if (!email.includes('@')) {
      showError('That is not an email address — it needs an @.');
      input.focus();
      return;
    }
    if (!isAllowed(email)) {
      const domain = email.split('@').pop();
      showError(`${domain} is not allowed. Use your @${ALLOWED_DOMAIN} address.`);
      input.focus();
      input.select();
      return;
    }
    showError('');
    unlock(email, true);
  });

  input.addEventListener('input', function () {
    if (err && !err.hidden) showError('');
  });

  if (signout) {
    signout.addEventListener('click', function (e) {
      e.preventDefault();
      relock();
    });
  }

  // A previously accepted address is re-checked, not trusted — the allowed
  // domain may have changed since it was stored.
  const remembered = store.get();
  if (remembered && isAllowed(remembered)) {
    unlock(remembered, false);
  } else {
    if (remembered) store.clear();
    document.body.classList.add('is-locked');
    app.hidden = true;
    lock.hidden = false;
    // Don't steal focus on load for someone using a screen reader from the top.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(() => input.focus({ preventScroll: true }), 120);
    }
  }
})();
