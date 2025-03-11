import { useState, useEffect } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";

const translations = { en, ar };

export const useTranslation = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const t = (key) => translations[language]?.[key] || key;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return { t, changeLanguage, language };
};
