"use client";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { LucideGlobe } from "lucide-react";
import { useSiteLanguage } from "@/src/components/site-language-provider";

interface LanguageSelectorProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function LanguageSelector({
  variant = "outline",
  size = "default",
  className = "",
}: LanguageSelectorProps) {
  const { currentLanguage, setLanguage, languages } = useSiteLanguage();

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    setLanguage(language);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={`gap-2 ${className}`}>
          {size !== "icon" ? (
            <>
              <span>{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
            </>
          ) : (
            <LucideGlobe className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={currentLanguage.code === language.code ? "bg-muted" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
