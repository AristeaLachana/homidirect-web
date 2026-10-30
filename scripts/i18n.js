// ---------- Μεταφράσεις ----------
const translations = {
    el: {
        "page.title": "HomiDirect - Αρχική Σελίδα",
        "nav.main" : "Αρχική",
        "nav.search": "Αναζήτηση Σπιτιού",
        "nav.create": "Καταχώρηση Αγγελίας",
        "nav.info": "Πληροφορίες",
        "nav.login": "Σύνδεση",
        "nav.language": "Αλλαγή γλώσσας",
        "rec.title": "Προτεινόμενα Ακίνητα",
        "rec.subtitle": "Επιλεγμένα ακίνητα από αξιόπιστους ιδιοκτήτες.",
        "rec.all": "Προβολή όλων",
        "nav.register": "Εγγραφή",
        "nav.account": "Λογαριασμός",
        "signup.h1" : "Εγγραφείτε τώρα",
        "login.h1" : "Σύνδεση στο λογαριασμό σας",
        "signup.field.name" : "Ονοματεπώνυμο",
        "auth.name": "Ονοματεπώνυμο",
        "auth.email": "Email",
        "auth.name.placeholder": "Ονοματεπώνυμο",
        "auth.email.placeholder": "name@example.com",
        "auth.signup.subtitle": "Βρες ή καταχώρησε ακίνητο χωρίς μεσίτη.",
        "auth.password.placeholder" : "κωδικός",
        "auth.verify.password.placeholder" : "επαλήθευση κωδικού",
        "auth.login.submit" : "Σύνδεση",
        "auth.signup.link": "Κάνε εδώ την εγγραφή σου.",
        "auth.login.link": "Σύνδεση.",
        "auth.password" : "Κωδικός Πρόσβασης",
        "auth.login.haveAccount" : "Δεν έχεις λογαριασμό;",
        "auth.signup.submit" : "Δημιουργία λογαριασμού",
        "auth.or" : "ή",
        "auth.google" : "Συνέχεια με Google",
        "auth.haveAccount" : "Έχεις ήδη λογαριασμό;",
        "auth.password.hint" : "Τουλάχιστον 8 χαρακτήρες.",
        "auth.terms": 'Συμφωνώ με τους <a href="terms.html" target="_blank" rel="noopener">Όρους Χρήσης</a> και την <a href="privacy.html" target="_blank" rel="noopener">Πολιτική Απορρήτου</a>.',
    },
    en: {
        "page.title": "HomiDirect - Home",
        "nav.main" : "Home",
        "nav.search": "Search Homes",
        "nav.create": "List Your Property",
        "nav.info": "Information",
        "nav.login": "Log in",
        "nav.language": "Change language",
        "rec.title": "Featured Properties",
        "rec.subtitle": "Selected properties from trusted owners.",
        "rec.all": "View all",
        "login.h1" : "Log in",
        "nav.register": "Sign up",
        "auth.login.submit" : "Log in",
        "nav.account": "Account",
        "signup.h1" : "Sign up now",
        "auth.signup.link": "Sign up here.",
        "auth.login.link": "Log In",
        "auth.name": "Full name",
        "auth.email": "Email",
        "auth.name.placeholder": "Full name",
        "auth.email.placeholder": "name@example.com",
        "auth.signup.subtitle": "Find or list a home without an agent.",
        "auth.password" : "Password",
        "auth.password.placeholder" : "password",
        "auth.verify.password.placeholder" : "password verification",
        "auth.login.haveAccount" : "No account yet?",
        "auth.signup.submit" : "Sign Up",
        "auth.or" : "or",
        "auth.google" : "Continue with Google",
        "auth.haveAccount" : "Already have an account?",
        "auth.password.hint" : "At least 8 characters.",
        "auth.terms": 'I agree to the <a href="terms.html" target="_blank" rel="noopener">Terms of Use</a> and the <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>.',
    },
};

const DEFAULT_LANG = "el";

// ---------- Στοιχεία της σελίδας ----------
const langMenu = document.getElementById("lang-menu");

// ---------- Αλλαγή γλώσσας ----------
function setLanguage(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    const t = translations[lang];

    document.documentElement.lang = lang;
    try {
        localStorage.setItem("lang", lang);
    } catch (e) {
        // αν το localStorage είναι αποκλεισμένο, απλά δεν θυμόμαστε την επιλογή
    }

        // κανονικά κείμενα
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const text = t[el.dataset.i18n];
        if (text) el.textContent = text;
    });

    // κείμενο με HTML μέσα (links)
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
        const html = t[el.dataset.i18nHtml];
        if (html) el.innerHTML = html;
    });

    // aria-label σε κουμπιά
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        const text = t[el.dataset.i18nAria];
        if (text) el.setAttribute("aria-label", text);
    });

    // placeholders σε inputs: <input data-i18n-placeholder="key">
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const text = t[el.dataset.i18nPlaceholder];
        if (text) el.placeholder = text;
    });

    // τίτλος καρτέλας
    if (t["page.title"]) document.title = t["page.title"];

    // σημάδεψε την ενεργή γλώσσα στο dropdown
    if (langMenu) {
    langMenu.querySelectorAll("button").forEach((b) => {
        if (b.dataset.lang === lang) {
            b.setAttribute("aria-current", "true");
        } else {
            b.removeAttribute("aria-current");
        }
    });
}
}

// ---------- Dropdowns ----------
const dropdowns = document.querySelectorAll(".dropdown");

function closeAll(except) {
    dropdowns.forEach((d) => {
        if (d === except) return;
        d.querySelector(".dropdown-menu").hidden = true;
        d.querySelector(".icon-button").setAttribute("aria-expanded", "false");
    });
}

dropdowns.forEach((d) => {
    const button = d.querySelector(".icon-button");
    const menu = d.querySelector(".dropdown-menu");

    button.addEventListener("click", () => {
        closeAll(d); // κλείνει το άλλο dropdown αν είναι ανοιχτό
        menu.hidden = !menu.hidden;
        button.setAttribute("aria-expanded", String(!menu.hidden));
    });
});

// επιλογή γλώσσας
if (langMenu) {
    langMenu.addEventListener("click", (e) => {
        const lang = e.target.dataset.lang;
        if (!lang) return;
        setLanguage(lang);
        closeAll();
    });
}

// κλείσιμο με κλικ έξω ή με Escape
document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) closeAll();
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll();
});

// ---------- Εκκίνηση ----------
let savedLang = DEFAULT_LANG;
try {
    savedLang = localStorage.getItem("lang") || DEFAULT_LANG;
} catch (e) {
    // αγνόησε
}
// προφόρτωση των ελληνικών γραμμάτων του font
if (document.fonts) {
    document.fonts.load("400 16px Roboto", "Αβγδ");
    document.fonts.load("500 16px Roboto", "Αβγδ");
    document.fonts.load("700 16px Roboto", "Αβγδ");
}

setLanguage(savedLang);