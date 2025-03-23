"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

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
}

interface CaseContextType {
  cases: CaseData[];
  currentCase: CaseData | null;
  setCurrentCase: (data: Omit<CaseData, "id" | "createdAt">) => void;
  clearCurrentCase: () => void;
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

  return (
    <CaseContext.Provider
      value={{
        cases,
        currentCase,
        setCurrentCase: addCase,
        clearCurrentCase,
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
