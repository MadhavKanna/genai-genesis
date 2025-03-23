"use client";

import { useCase } from "@/src/contexts/CaseContext";
import { useLanguage } from "@/src/contexts/LanguageContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
  const {
    currentCase,
    getTranslatedContent,
    getDifferentialDiagnoses,
    getSuggestedNextSteps,
  } = useCase();
  const { language } = useLanguage();
  const router = useRouter();

  if (!currentCase) {
    router.push("/patient/new");
    return null;
  }

  const translatedContent = getTranslatedContent(language);
  const differentialDiagnoses = getDifferentialDiagnoses();
  const suggestedNextSteps = getSuggestedNextSteps();

  // Use translated content if available, otherwise use original content
  const displayContent = {
    primaryConcern:
      translatedContent?.primaryConcern || currentCase.primaryConcern,
    additionalSymptoms:
      translatedContent?.additionalSymptoms || currentCase.additionalSymptoms,
    medications: translatedContent?.medications || currentCase.medications,
    allergies: translatedContent?.allergies || currentCase.allergies,
    preExistingConditions:
      translatedContent?.preExistingConditions ||
      currentCase.preExistingConditions,
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Review Your Case</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Case Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="font-semibold">Primary Concern</dt>
                <dd>{displayContent.primaryConcern}</dd>
              </div>
              <div>
                <dt className="font-semibold">Duration</dt>
                <dd>
                  {currentCase.symptomDuration} {currentCase.durationUnit}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Additional Symptoms</dt>
                <dd>{displayContent.additionalSymptoms}</dd>
              </div>
              <div>
                <dt className="font-semibold">Pre-existing Conditions</dt>
                <dd>{displayContent.preExistingConditions}</dd>
              </div>
              <div>
                <dt className="font-semibold">Medications</dt>
                <dd>{displayContent.medications}</dd>
              </div>
              <div>
                <dt className="font-semibold">Allergies</dt>
                <dd>{displayContent.allergies}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Possible Conditions to Discuss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {differentialDiagnoses.map((diagnosis, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold">
                    {diagnosis.condition} ({diagnosis.confidence})
                  </h3>
                  <p className="text-sm mt-1">{diagnosis.description}</p>
                  <ul className="list-disc list-inside mt-2">
                    {diagnosis.nextSteps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-sm">
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Suggested Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              {suggestedNextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.push("/patient/new")}>
            Edit Case
          </Button>
          <Button onClick={() => router.push("/patient/submit")}>
            Submit Case
          </Button>
        </div>
      </div>
    </div>
  );
}
