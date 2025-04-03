"use client";
import { useContext, useState, useEffect, createContext } from "react";
import en from "../locales/en.json";
import ar from "../locales/ar.json";
import ru from "../locales/ru.json";

const translations = { en, ar, ru };
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "en"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    const link = document.getElementById("bootstrap-css");
    if (link) {
      link.remove(); // Remove the previous link if exists
    }

    const newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.id = "bootstrap-css";
    if (language === "ar") {
      newLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css";
    } else {
      newLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    }

    document.head.appendChild(newLink);
  }, [language]);

  const t = (key) => translations[language]?.[key] || key;

  const changeLanguage = (lang) => {
    window.location.reload();
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
