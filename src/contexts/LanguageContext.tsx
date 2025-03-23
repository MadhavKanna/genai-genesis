"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (config: any, element: string): any;
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en-US");

  useEffect(() => {
    // Initialize Google Translate
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Define the callback function
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,es,fr,de,it,ja,ko,zh,ru",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Function to handle language changes
  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);

    // Get the Google Translate widget
    const googleFrame = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (googleFrame) {
      // Convert our language code to Google's format (e.g., 'en-US' to 'en')
      const googleLang = newLang.split("-")[0];
      googleFrame.value = googleLang;
      googleFrame.dispatchEvent(new Event("change"));
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleLanguageChange }}
    >
      <div id="google_translate_element" style={{ display: "none" }} />
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
