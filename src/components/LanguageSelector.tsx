"use client";

import React from "react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

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
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
