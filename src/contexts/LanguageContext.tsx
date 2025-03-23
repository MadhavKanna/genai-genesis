"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    // Initialize Google Translate
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Update Google Translate when language changes
    if (window.google && window.google.translate) {
      const translateElement = window.google.translate.TranslateElement;
      if (translateElement) {
        translateElement.getInstance().translate("", language);
      }
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Add Google Translate initialization function to window
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
  }
}

window.googleTranslateElementInit = function () {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages:
        "hi,es,fr,de,it,ja,ko,zh,ru,pt,nl,pl,ar,tr,vi,th,id,ms,fil",
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
};
