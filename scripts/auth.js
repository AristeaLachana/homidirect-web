// Κοινό JS για όλες τις φόρμες με data-auth="..."
document.querySelectorAll('form[data-auth]').forEach((form) => {
  const submitButton = form.querySelector('button[type="submit"]');

  // το κουμπί υποβολής ενεργοποιείται μόνο όταν έχουν συμπληρωθεί όλα τα υποχρεωτικά πεδία
  function updateSubmitButton() {
    if (!submitButton) return;
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    const allFilled = [...requiredFields].every((field) =>
      field.type === 'checkbox' ? field.checked : field.value.trim() !== ''
    );
    submitButton.disabled = !allFilled;
  }

  form.addEventListener('input', updateSubmitButton);
  updateSubmitButton();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form));
    const type = form.dataset.auth; // "signup" ή "login"
    console.log(type, data);
    // await fetch(`/api/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

    // μετά την επιτυχή υποβολή, επιστροφή στην αρχική σελίδα
    window.location.href = '../index.html';
  });
});

// ---------- Εμφάνιση/απόκρυψη κωδικού ----------

// aria-label από τις μεταφράσεις του i18n.js
function passwordToggleLabel(key) {
  if (typeof translations === "undefined") return "";
  const lang = document.documentElement.lang || "el";
  const t = translations[lang] || translations.el;
  return t[key] || "";
}

// ενημέρωση του aria-label ενός κουμπιού με βάση την τρέχουσα κατάσταση
function refreshPasswordToggleLabel(button) {
  const input = button.closest(".password-field")?.querySelector(".auth-input");
  if (!input) return;
  const key = input.type === "password" ? "auth.password.show" : "auth.password.hide";
  button.setAttribute("aria-label", passwordToggleLabel(key));
}

document.querySelectorAll(".password-toggle").forEach((button) => {
  const input = button.closest(".password-field")?.querySelector(".auth-input");
  if (!input) return;
  const eye = button.querySelector(".icon-eye");
  const eyeOff = button.querySelector(".icon-eye-off");

  button.addEventListener("click", () => {
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    // ανοιχτό μάτι όταν φαίνεται ο κωδικός, κλειστό όταν κρύβεται
    // (τα SVG δεν έχουν .hidden property, οπότε χειριζόμαστε το attribute)
    eye.toggleAttribute("hidden", !visible);
    eyeOff.toggleAttribute("hidden", visible);
    button.setAttribute("aria-pressed", String(visible));
    refreshPasswordToggleLabel(button);
  });

  refreshPasswordToggleLabel(button);
});

// ενημέρωση των aria-label όταν αλλάζει η γλώσσα
document.addEventListener("languagechange", () => {
  document.querySelectorAll(".password-toggle").forEach(refreshPasswordToggleLabel);
});
