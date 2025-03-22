import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  LucideCheckCircle,
  LucideArrowLeft,
  LucideUsers,
  LucideCalendar,
} from "lucide-react";

export default function ConfirmationPage() {
  return (
    <div className="container max-w-2xl py-12 px-4">
      <Link href="/" className="inline-flex items-center gap-1 text-sm mb-6">
        <LucideArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <LucideCheckCircle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">
            Case Submitted Successfully
          </CardTitle>
          <CardDescription>
            Your case has been anonymized and is now available for review by
            medical professionals.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-medium mb-2">Case ID: #DDX-23789</h3>
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-1.5">
                <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                <span>Submitted: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <LucideUsers className="h-4 w-4 text-muted-foreground" />
                <span>Target Reviews: 3-5</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">What happens next?</h3>
            <ol className="text-left space-y-3">
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>
                  Medical professionals will review your case and provide their
                  insights
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>
                  You'll receive a notification when your guidance report is
                  ready
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>
                  Review the guidance and discuss it with your healthcare
                  provider
                </span>
              </li>
            </ol>
          </div>

          <div className="rounded-lg border p-4 text-sm text-muted-foreground">
            <p>
              Expected response time:{" "}
              <span className="font-medium">24-48 hours</span>
            </p>
            <p className="mt-2">
              You'll receive an email notification when your guidance report is
              ready to view.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link href="/patient/dashboard">
            <Button className="w-full">Go to Dashboard</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
