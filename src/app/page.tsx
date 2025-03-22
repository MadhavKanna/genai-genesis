import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideUsers, LucideBrain, LucideActivity } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden">
              <Image
                src="/images/symedon-logo.png"
                alt="Symedon Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">Symedon</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium">
              How It Works
            </Link>
            <Link href="#for-clinicians" className="text-sm font-medium">
              For Clinicians
            </Link>
            <Link href="#about" className="text-sm font-medium">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute bottom-10 right-[10%] w-64 h-64 rounded-full bg-secondary/20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-warning/20 blur-3xl"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-symedon-gradient text-primary-foreground shadow hover:bg-primary/80 mb-4">
                  <span className="text-xs">Powered by Google Gemini</span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Connecting Patients with Global Medical Expertise
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Symedon bridges the gap between patients seeking medical guidance and volunteer clinicians worldwide.
                  Get insights from multiple medical professionals while maintaining your privacy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/patient/new">
                    <Button size="lg" className="w-full sm:w-auto rounded-full">
                      Seek Medical Guidance
                    </Button>
                  </Link>
                  <Link href="/clinician/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full">
                      Join as a Clinician
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  Not a replacement for emergency care or your primary physician.
                </p>
              </div>
              <div className="relative h-[350px] rounded-[24px] overflow-hidden symedon-border flex items-center justify-center bg-white">
                <div className="absolute inset-0 bg-grid-pattern-light opacity-10"></div>
                <div className="relative z-10 p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/images/symedon-logo.png"
                      alt="Symedon Logo"
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">How Symedon Works</h3>
                  <p className="text-muted-foreground">
                    Submit your health concerns securely, receive insights from multiple medical professionals, and get
                    aggregated guidance to discuss with your healthcare provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">How It Works</h2>
              <p className="text-muted-foreground md:text-lg mt-4 max-w-3xl mx-auto">
                Our platform connects patients with medical professionals worldwide while maintaining privacy and
                security.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="symedon-card border-none">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-full bg-symedon-blue-gradient flex items-center justify-center mb-4">
                    <LucideUsers className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Submit Your Case</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Describe your symptoms, upload relevant images, and provide medical history. All information is
                    anonymized.
                  </p>
                </CardContent>
              </Card>
              <Card className="symedon-card border-none">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-full bg-symedon-green-gradient flex items-center justify-center mb-4">
                    <LucideBrain className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>AI-Powered Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Google Gemini analyzes your case and matches you with the most appropriate medical professionals.
                  </p>
                </CardContent>
              </Card>
              <Card className="symedon-card border-none">
                <CardHeader>
                  <div className="p-2 w-12 h-12 rounded-full bg-symedon-red-gradient flex items-center justify-center mb-4">
                    <LucideActivity className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>Receive Guidance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get aggregated feedback and guidance that you can discuss with your healthcare provider.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-gradient-to-br from-blue-50 to-white" id="for-clinicians">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter">For Medical Professionals</h2>
                <p className="text-muted-foreground md:text-lg">
                  Join our global network of volunteer clinicians to help patients worldwide while expanding your
                  clinical experience.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Contribute to global healthcare access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Expand your clinical experience with diverse cases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Collaborate with peers from around the world</span>
                  </li>
                </ul>
                <div>
                  <Link href="/clinician/register">
                    <Button size="lg" className="rounded-full">
                      Join as a Clinician
                    </Button>
                  </Link>
                </div>
              </div>
              <Card className="symedon-card border-none">
                <CardHeader>
                  <CardTitle>Clinician Registration</CardTitle>
                  <CardDescription>
                    Complete your profile to join our global network of medical professionals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Medical Specialty</label>
                        <div className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                          Select specialty
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Years of Experience</label>
                        <div className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                          Select years
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Medical License Number</label>
                      <div className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                        Enter license number
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Country of Practice</label>
                      <div className="h-10 w-full rounded-md border bg-background px-3 py-2 text-sm">
                        Select country
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">Continue Registration</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden">
              <Image
                src="/images/symedon-logo.png"
                alt="Symedon Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold">Symedon</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Symedon. All rights reserved. Not a substitute for professional medical
            advice.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

