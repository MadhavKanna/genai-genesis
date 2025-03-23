export interface CaseData {
  id: string;
  primaryConcern: string;
  symptomDuration: number;
  durationUnit: string;
  additionalSymptoms: string;
  age: number;
  gender: string;
  medications: string;
  allergies: string;
  preExistingConditions: string;
  translatedResponses: {
    language: string;
    primaryConcern: string;
    additionalSymptoms: string;
    medications: string;
    allergies: string;
    preExistingConditions: string;
  }[];
  differentialDiagnoses: {
    condition: string;
    confidence: string;
    description: string;
    nextSteps: string[];
  }[];
  suggestedNextSteps: string[];
  lastUpdated: string;
  images?: {
    id: string;
    url: string;
    description: string;
    timestamp: string;
  }[];
}
