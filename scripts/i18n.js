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
    },
};

const DEFAULT_LANG = "el";

// ---------- Στοιχεία της σελίδας ----------
const langButton = document.getElementById("lang-button");
const langMenu = document.getElementById("lang-menu");
const footerRights = document.getElementById("footer-rights");

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

    // placeholders σε inputs: <input data-i18n-placeholder="key">
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const text = t[el.dataset.i18nPlaceholder];
        if (text) el.placeholder = text;
    });

    // τίτλος καρτέλας
    if (t["page.title"]) document.title = t["page.title"];

    // footer με τη χρονιά
    if (footerRights) {
        footerRights.textContent =
            `© ${new Date().getFullYear()} HomiDirect. ${t["footer.rights"]}`;
    }

    // aria-label του κουμπιού γλώσσας
    if (langButton) langButton.setAttribute("aria-label", t["nav.language"]);

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

// ---------- Dropdown ----------
function closeMenu() {
    if (!langMenu) return;
    langMenu.hidden = true;
    langButton.setAttribute("aria-expanded", "false");
}

if (langButton && langMenu) {
    langButton.addEventListener("click", () => {
        langMenu.hidden = !langMenu.hidden;
        langButton.setAttribute("aria-expanded", String(!langMenu.hidden));
    });

    langMenu.addEventListener("click", (e) => {
        const lang = e.target.dataset.lang;
        if (!lang) return;
        setLanguage(lang);
        closeMenu();
    });

    // κλείσιμο με κλικ έξω ή με Escape
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".lang-picker")) closeMenu();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

// ---------- Εκκίνηση ----------
let savedLang = DEFAULT_LANG;
try {
    savedLang = localStorage.getItem("lang") || DEFAULT_LANG;
} catch (e) {
    // αγνόησε
}
setLanguage(savedLang);