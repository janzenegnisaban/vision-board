import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Info, Mail, MapPin, Phone, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="border-b bg-white dark:bg-slate-950">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <span className="text-xl font-bold">VisionBoard</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-slate-900 dark:text-slate-50">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container px-4 py-12 md:px-6 md:py-24">
        <section className="flex flex-col items-center justify-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
          <p className="mt-4 max-w-[700px] text-slate-600 dark:text-slate-400 md:text-xl/relaxed">
            Get in touch with our team for any inquiries or assistance
          </p>
        </section>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-50">Location</h3>
                    <p className="text-slate-600 dark:text-slate-400">New Cabalan, Olongapo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-50">Email</h3>
                    <p className="text-slate-600 dark:text-slate-400">contact@visionboard.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-50">Phone</h3>
                    <p className="text-slate-600 dark:text-slate-400">+63 968 350 6258</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-slate-50">Website</h3>
                    <p className="text-slate-600 dark:text-slate-400">www.visionboard.com</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-slate-600 dark:text-slate-400">
                  Need assistance or have inquiries? Reach out to us! Our team is committed to delivering an intuitive
                  and interactive experience.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter your message" className="min-h-[120px]" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="border-t bg-white dark:bg-slate-950 mt-12">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <span className="text-xl font-bold">VisionBoard</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {new Date().getFullYear()} VisionBoard. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
