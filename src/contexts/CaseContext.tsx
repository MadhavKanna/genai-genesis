"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface TranslatedResponse {
  language: string;
  primaryConcern: string;
  additionalSymptoms: string;
  medications: string;
  allergies: string;
  preExistingConditions: string;
}

interface DifferentialDiagnosis {
  condition: string;
  confidence: string;
  description: string;
  nextSteps: string[];
}

interface CaseData {
  id?: string;
  createdAt?: string;
  primaryConcern: string;
  symptomDuration: number;
  durationUnit: string;
  additionalSymptoms: string;
  age: number;
  gender: string;
  otherGender: string | null;
  preExistingConditions: string;
  medications: string;
  allergies: string;
  images: {
    id: string;
    url: string;
    description: string;
    timestamp: string;
  }[];
  translatedResponses?: TranslatedResponse[];
  differentialDiagnoses?: DifferentialDiagnosis[];
  suggestedNextSteps?: string[];
}

interface CaseContextType {
  cases: CaseData[];
  currentCase: CaseData | null;
  setCurrentCase: (data: Omit<CaseData, "id" | "createdAt">) => void;
  clearCurrentCase: () => void;
  getTranslatedContent: (language: string) => TranslatedResponse | null;
  getDifferentialDiagnoses: () => DifferentialDiagnosis[];
  getSuggestedNextSteps: () => string[];
}

const CaseContext = createContext<CaseContextType | undefined>(undefined);

export function CaseProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [currentCase, setCurrentCase] = useState<CaseData | null>(null);

  const addCase = (data: Omit<CaseData, "id" | "createdAt">) => {
    const newCase: CaseData = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setCases((prev) => [...prev, newCase]);
    setCurrentCase(newCase);
  };

  const clearCurrentCase = () => {
    setCurrentCase(null);
  };

  const getTranslatedContent = (
    language: string
  ): TranslatedResponse | null => {
    if (!currentCase?.translatedResponses) return null;
    return (
      currentCase.translatedResponses.find((tr) => tr.language === language) ||
      null
    );
  };

  const getDifferentialDiagnoses = (): DifferentialDiagnosis[] => {
    return currentCase?.differentialDiagnoses || [];
  };

  const getSuggestedNextSteps = (): string[] => {
    return currentCase?.suggestedNextSteps || [];
  };

  return (
    <CaseContext.Provider
      value={{
        cases,
        currentCase,
        setCurrentCase: addCase,
        clearCurrentCase,
        getTranslatedContent,
        getDifferentialDiagnoses,
        getSuggestedNextSteps,
      }}
    >
      {children}
    </CaseContext.Provider>
  );
}

export function useCase() {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error("useCase must be used within a CaseProvider");
  }
  return context;
}
