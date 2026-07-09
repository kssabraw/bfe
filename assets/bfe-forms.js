/**
 * BFE form handler — submits the contact form and footer newsletter
 * signups to an n8n webhook.
 *
 * SETUP: replace the URL below with your n8n webhook URL
 * (n8n → your workflow → Webhook node → Production URL).
 * Leave the Webhook node's "Allowed Origins (CORS)" at * or set it
 * to your site's domain.
 *
 * Every submission POSTs JSON with a `form` field ("contact" or
 * "newsletter") so one n8n workflow can route both.
 */
var N8N_WEBHOOK_URL = "https://YOUR-N8N-INSTANCE/webhook/REPLACE-ME";

(function () {
  "use strict";

  var configured = N8N_WEBHOOK_URL.indexOf("REPLACE-ME") === -1;

  function submitToN8n(payload) {
    if (!configured) {
      console.warn("bfe-forms: N8N_WEBHOOK_URL is not configured yet.");
      return Promise.reject(new Error("webhook not configured"));
    }
    payload.page = window.location.pathname;
    payload.submittedAt = new Date().toISOString();
    return fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res;
    });
  }

  /* ---- Contact form (Contact Us page) ---- */
  var contact = document.getElementById("bfe-contact-form");
  if (contact) {
    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      /* honeypot: real users never fill this hidden field */
      if (contact.querySelector('[name="website"]').value) return;

      var btn = contact.querySelector('button[type="submit"]');
      var msg = document.getElementById("bfe-contact-message");
      btn.disabled = true;
      btn.textContent = "Sending…";
      msg.textContent = "";
      msg.className = "bfe-form-message";

      submitToN8n({
        form: "contact",
        name: contact.querySelector('[name="name"]').value,
        email: contact.querySelector('[name="email"]').value,
        company: contact.querySelector('[name="company"]').value,
        message: contact.querySelector('[name="message"]').value,
      })
        .then(function () {
          window.location.href = "/thank-you/";
        })
        .catch(function () {
          btn.disabled = false;
          btn.textContent = "Send Message";
          msg.textContent =
            "Sorry, something went wrong sending your message. Please try again or email us directly.";
          msg.className = "bfe-form-message bfe-form-error";
        });
    });
  }

  /* ---- Footer newsletter forms (sitewide) ---- */
  var newsletters = document.querySelectorAll("form.jkit-mailchimp-form");
  Array.prototype.forEach.call(newsletters, function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      var emailInput = form.querySelector('input[type="email"]');
      var msgBox = form.querySelector(".jkit-mailchimp-message");
      var btn = form.querySelector('button[type="submit"]');
      if (!emailInput || !emailInput.value) return;

      btn.disabled = true;
      submitToN8n({ form: "newsletter", email: emailInput.value })
        .then(function () {
          if (msgBox) {
            msgBox.textContent =
              form.getAttribute("data-success-message") || "Subscribed!";
            msgBox.style.cssText = "display:block;padding:8px 0;color:#2e7d32;";
          }
          emailInput.value = "";
        })
        .catch(function () {
          if (msgBox) {
            msgBox.textContent =
              form.getAttribute("data-error-message") || "Something went wrong";
            msgBox.style.cssText = "display:block;padding:8px 0;color:#c62828;";
          }
        })
        .then(function () {
          btn.disabled = false;
        });
    }, true);
  });
})();
