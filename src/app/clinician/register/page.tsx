"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Checkbox } from "@/src/components/ui/checkbox";
import { LucideArrowLeft, LucideShield, LucideInfo } from "lucide-react";

export default function ClinicianRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the server
    router.push("/clinician/dashboard");
  };

  return (
    <div className="container max-w-3xl py-8 px-4 md:py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-6">
        <LucideArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">
          Clinician Registration
        </h1>
        <p className="text-muted-foreground mt-2">
          Join our global network of medical professionals to provide guidance
          to patients worldwide.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 1
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            1
          </div>
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>
            Professional Info
          </span>
        </div>
        <div className="h-px w-12 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              step >= 2
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            2
          </div>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>
            Verification
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Please provide your medical credentials and professional
                information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="First name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Last name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your professional email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Medical Specialty</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family-medicine">
                      Family Medicine
                    </SelectItem>
                    <SelectItem value="internal-medicine">
                      Internal Medicine
                    </SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="psychiatry">Psychiatry</SelectItem>
                    <SelectItem value="emergency-medicine">
                      Emergency Medicine
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license-number">Medical License Number</Label>
                  <Input
                    id="license-number"
                    placeholder="License number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license-country">Country of Licensure</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Clinical Experience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-20">11-20 years</SelectItem>
                    <SelectItem value="20+">20+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Brief description of your professional background"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="languages">Languages Spoken</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="english" defaultChecked />
                    <Label htmlFor="english">English</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="spanish" />
                    <Label htmlFor="spanish">Spanish</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="french" />
                    <Label htmlFor="french">French</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mandarin" />
                    <Label htmlFor="mandarin">Mandarin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="hindi" />
                    <Label htmlFor="hindi">Hindi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="arabic" />
                    <Label htmlFor="arabic">Arabic</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={() => setStep(2)}>
                Continue to Verification
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification & Agreement</CardTitle>
              <CardDescription>
                Please verify your identity and agree to our terms of service.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted p-4 flex items-start gap-3">
                <LucideInfo className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Verification Process</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We verify all clinicians to ensure the quality and safety of
                    our platform. Your medical license will be verified through
                    official channels.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-upload">Upload Medical License or ID</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <LucideShield className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a clear image of your medical license or professional
                    ID
                  </p>
                  <Input
                    id="id-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("id-upload")?.click()
                    }
                  >
                    Select File
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required className="mt-1" />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      Privacy Policy
                    </Link>
                    .
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="guidelines" required className="mt-1" />
                  <Label htmlFor="guidelines" className="text-sm">
                    I agree to follow the clinical guidelines and ethical
                    standards of the platform, providing guidance within my area
                    of expertise and acknowledging that I am not establishing a
                    doctor-patient relationship.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="verification" required className="mt-1" />
                  <Label htmlFor="verification" className="text-sm">
                    I understand that my credentials will be verified and that
                    providing false information may result in termination of my
                    account and potential legal consequences.
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button type="submit">Complete Registration</Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  );
}
