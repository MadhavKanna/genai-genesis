"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  flag: string
}

type SiteLanguageContextType = {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  languages: Language[]
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

const SiteLanguageContext = createContext<SiteLanguageContextType>({
  currentLanguage: languages[0],
  setLanguage: () => {},
  languages,
})

export function SiteLanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("site-language")
    if (savedLanguage) {
      const language = languages.find((lang) => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
        document.documentElement.lang = language.code
      }
    }
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    document.documentElement.lang = language.code
    localStorage.setItem("site-language", language.code)

    // In a real app, this would trigger translations to be loaded
    console.log(`Language changed to ${language.name}`)
  }

  return (
    <SiteLanguageContext.Provider value={{ currentLanguage, setLanguage, languages }}>
      {children}
    </SiteLanguageContext.Provider>
  )
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext)
  if (!context) {
    throw new Error("useSiteLanguage must be used within a SiteLanguageProvider")
  }
  return context
}

