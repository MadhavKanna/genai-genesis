"use client";

import React from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";

const languages = [
  { code: "en-US", name: "English", googleCode: "en" },
  { code: "hi-IN", name: "हिंदी", googleCode: "hi" },
  { code: "es-ES", name: "Español", googleCode: "es" },
  { code: "fr-FR", name: "Français", googleCode: "fr" },
  { code: "de-DE", name: "Deutsch", googleCode: "de" },
  { code: "it-IT", name: "Italiano", googleCode: "it" },
  { code: "ja-JP", name: "日本語", googleCode: "ja" },
  { code: "ko-KR", name: "한국어", googleCode: "ko" },
  { code: "zh-CN", name: "中文", googleCode: "zh-CN" },
  { code: "ru-RU", name: "Русский", googleCode: "ru" },
  { code: "pt-BR", name: "Português", googleCode: "pt" },
  { code: "nl-NL", name: "Nederlands", googleCode: "nl" },
  { code: "pl-PL", name: "Polski", googleCode: "pl" },
  { code: "ar-SA", name: "العربية", googleCode: "ar" },
  { code: "tr-TR", name: "Türkçe", googleCode: "tr" },
  { code: "vi-VN", name: "Tiếng Việt", googleCode: "vi" },
  { code: "th-TH", name: "ไทย", googleCode: "th" },
  { code: "id-ID", name: "Bahasa Indonesia", googleCode: "id" },
  { code: "ms-MY", name: "Bahasa Melayu", googleCode: "ms" },
  { code: "fil-PH", name: "Filipino", googleCode: "fil" },
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Select language"
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
