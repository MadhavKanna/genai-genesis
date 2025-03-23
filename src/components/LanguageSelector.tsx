"use client";

import React from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";

const languages = [
  { code: "en-US", name: "English" },
  { code: "hi-IN", name: "हिंदी" },
  { code: "es-ES", name: "Español" },
  { code: "fr-FR", name: "Français" },
  { code: "de-DE", name: "Deutsch" },
  { code: "it-IT", name: "Italiano" },
  { code: "ja-JP", name: "日本語" },
  { code: "ko-KR", name: "한국어" },
  { code: "zh-CN", name: "中文" },
  { code: "ru-RU", name: "Русский" },
  { code: "pt-BR", name: "Português" },
  { code: "nl-NL", name: "Nederlands" },
  { code: "pl-PL", name: "Polski" },
  { code: "ar-SA", name: "العربية" },
  { code: "tr-TR", name: "Türkçe" },
  { code: "vi-VN", name: "Tiếng Việt" },
  { code: "th-TH", name: "ไทย" },
  { code: "id-ID", name: "Bahasa Indonesia" },
  { code: "ms-MY", name: "Bahasa Melayu" },
  { code: "fil-PH", name: "Filipino" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="h-8 rounded-md border border-input bg-background px-2 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
