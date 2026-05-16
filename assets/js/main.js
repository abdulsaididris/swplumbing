(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var mobile = document.getElementById("mobile-nav");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      var open = mobile.hasAttribute("hidden");
      if (open) mobile.removeAttribute("hidden");
      else mobile.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobile.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobile.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var form = document.getElementById("dispatch-form");
  var statusEl = document.getElementById("form-status");
  if (form && statusEl) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var payload = {};
      data.forEach(function (v, k) {
        if (k === "consent") payload[k] = form.querySelector('[name="consent"]').checked;
        else payload[k] = typeof v === "string" ? v.trim() : v;
      });

      try {
        localStorage.setItem(
          "swyeg_dispatch_" + Date.now(),
          JSON.stringify({ ...payload, at: new Date().toISOString() })
        );
      } catch (_) {}

      statusEl.textContent =
        "Request received — our dispatcher will call you shortly to confirm trade, ETA, and any call-out fees. (Demo: connect this form to your CRM, email, or VoIP webhook.)";
      form.reset();
    });
  }
})();
