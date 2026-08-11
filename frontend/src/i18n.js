import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import es from "./locales/es.json";
import nl from "./locales/nl.json";

const stored = typeof window !== "undefined" ? localStorage.getItem("me_lang") : null;

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    ar: { translation: ar },
    fr: { translation: fr },
    de: { translation: de },
    es: { translation: es },
    nl: { translation: nl },
  },
  lng: stored || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

const applyDir = (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

applyDir(i18n.language);
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("me_lang", lng);
  applyDir(lng);
});

export default i18n;
