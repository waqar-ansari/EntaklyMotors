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
  }, [language]);

  const t = (key) => translations[language]?.[key] || key;

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ t, changeLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
