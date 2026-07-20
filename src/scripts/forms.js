/**
 * Submits the contact form and footer newsletter signups to Web3Forms.
 * Each form carries its own `access_key` hidden field, so this script just
 * posts the form's FormData to the Web3Forms endpoint.
 */
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

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
      const formData = new FormData(contact);
      formData.delete('website'); // drop honeypot from the email payload
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || `HTTP ${res.status}`);
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
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const msg = form.querySelector('.form-message');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
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
      msg.textContent = 'Thanks — you’re subscribed!';
      msg.className = 'form-message form-message--success';
      form.reset();
    } catch {
      msg.textContent = 'Something went wrong. Please try again.';
      msg.className = 'form-message form-message--error';
    } finally {
      btn.disabled = false;
    }
  });
}
