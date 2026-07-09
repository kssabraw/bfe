/**
 * Submits the contact form and footer newsletter signups to an n8n webhook.
 *
 * SETUP: replace the URL below with your n8n webhook Production URL and
 * leave the Webhook node's "Allowed Origins (CORS)" at * (or your domain).
 * Payloads carry a `form` field ("contact" | "newsletter") for routing.
 */
const N8N_WEBHOOK_URL = 'https://YOUR-N8N-INSTANCE/webhook/REPLACE-ME';

const configured = !N8N_WEBHOOK_URL.includes('REPLACE-ME');

async function submitToN8n(payload) {
  if (!configured) {
    console.warn('forms: N8N_WEBHOOK_URL is not configured yet.');
    throw new Error('webhook not configured');
  }
  const res = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...payload,
      page: window.location.pathname,
      submittedAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}

/* ---- Contact form ---- */
const contact = document.getElementById('contact-form');
if (contact) {
  contact.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (contact.querySelector('[name="website"]').value) return; // honeypot
    if (!contact.checkValidity()) {
      contact.reportValidity();
      return;
    }

    const btn = contact.querySelector('button[type="submit"]');
    const msg = document.getElementById('contact-message');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    msg.textContent = '';
    msg.className = 'form-message';

    try {
      await submitToN8n({
        form: 'contact',
        name: contact.querySelector('[name="name"]').value,
        email: contact.querySelector('[name="email"]').value,
        company: contact.querySelector('[name="company"]').value,
        message: contact.querySelector('[name="message"]').value,
      });
      window.location.href = contact.dataset.thanksUrl || '/thank-you/';
    } catch {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      msg.textContent =
        'Sorry, something went wrong sending your message. Please try again or email us directly.';
      msg.className = 'form-message form-message--error';
    }
  });
}

/* ---- Newsletter forms ---- */
for (const form of document.querySelectorAll('form[data-newsletter]')) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const msg = form.querySelector('.form-message');
    const btn = form.querySelector('button[type="submit"]');
    if (!email.value) return;

    btn.disabled = true;
    try {
      await submitToN8n({ form: 'newsletter', email: email.value });
      msg.textContent = 'Thanks — you’re subscribed!';
      msg.className = 'form-message form-message--success';
      email.value = '';
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      msg.className = 'form-message form-message--error';
    } finally {
      btn.disabled = false;
    }
  });
}
