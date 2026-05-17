(function () {
  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".mobile-menu-btn");
  var navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = '';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        navLinks.style.borderBottom = '1px solid #E2E8F0';
        navLinks.style.zIndex = '1000';
      }
    });
  }

  var form = document.getElementById("dispatch-form");
  var statusEl = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      
      if (statusEl) {
        statusEl.textContent = "Sending request...";
        statusEl.style.color = "#0066CC";
      }

      var formData = new FormData(form);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          if (statusEl) {
            statusEl.textContent = "✅ Request received! Our dispatcher will contact you shortly.";
            statusEl.style.color = "#16A34A";
          } else {
            alert("✅ Request received! Our dispatcher will contact you shortly.");
          }
          form.reset();
        } else {
          console.log(response);
          if (statusEl) {
            statusEl.textContent = "❌ Error sending request. Please call us directly.";
            statusEl.style.color = "#C0392B";
          }
        }
      })
      .catch(error => {
        console.log(error);
        if (statusEl) {
          statusEl.textContent = "❌ Error sending request. Please call us directly.";
          statusEl.style.color = "#C0392B";
        }
      });
    });
  }
})();
