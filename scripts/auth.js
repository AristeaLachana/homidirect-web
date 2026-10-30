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
