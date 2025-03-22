"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { LucideArrowLeft } from "lucide-react";
import { LanguageSelector } from "@/src/components/language-selector";
import { useAuth } from "@/src/components/auth-provider";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (userType: "patient" | "clinician") => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, we'll accept any credentials
      await signIn(
        email || "demo@symedon.com",
        password || "password",
        userType
      );
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm">
          <LucideArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <LanguageSelector size="sm" className="rounded-full" />
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative h-16 w-16 overflow-hidden mb-4">
          <Image
            src="/symedon-logo.png"
            alt="Symedon Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold">Welcome to Symedon</h1>
        <p className="text-muted-foreground mt-1">Sign in to your account</p>
      </div>

      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="clinician">Clinician</TabsTrigger>
        </TabsList>

        <TabsContent value="patient">
          <Card>
            <CardHeader>
              <CardTitle>Patient Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your health dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="patient-email">Email</Label>
                <Input
                  id="patient-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="patient-password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="patient-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => handleLogin("patient")}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="clinician">
          <Card>
            <CardHeader>
              <CardTitle>Clinician Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your clinical dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clinician-email">Email</Label>
                <Input
                  id="clinician-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="clinician-password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="clinician-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full"
                onClick={() => handleLogin("clinician")}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/clinician/register"
                  className="text-primary underline"
                >
                  Register as a clinician
                </Link>
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
