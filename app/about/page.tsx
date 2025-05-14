import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-slate-900 dark:text-slate-50">
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About VisionBoard</h1>
          <p className="mt-4 max-w-[800px] text-slate-600 dark:text-slate-400 md:text-xl/relaxed">
            Digital Interactive Information Board
          </p>
        </section>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to VisionBoard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-slate-600 dark:text-slate-400">
            <p>
              Welcome to VisionBoard: Digital Interactive Information Board, a platform designed to enhance information
              accessibility through role-based interaction. Whether you're a guest exploring general updates, a user
              engaging with announcements, an admin managing events, or a superadmin overseeing the system—VisionBoard
              ensures seamless communication and interactivity.
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Key Features:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium text-slate-900 dark:text-slate-50">Multi-Role Access:</span> Separate
                  functionalities for guests, users, admins, and superadmins.
                </li>
                <li>
                  <span className="font-medium text-slate-900 dark:text-slate-50">Interactive Announcements:</span>{" "}
                  Various display formats, including timelines, grids, and image hotspots.
                </li>
                <li>
                  <span className="font-medium text-slate-900 dark:text-slate-50">Event Management:</span> Easily
                  organize and update event schedules.
                </li>
                <li>
                  <span className="font-medium text-slate-900 dark:text-slate-50">Dark/Light Mode:</span> Customizable
                  themes for a personalized experience.
                </li>
              </ul>
            </div>

            <p>
              VisionBoard empowers organizations to streamline information sharing and enhance engagement through
              dynamic digital boards.
            </p>

            <div className="flex justify-center mt-8">
              <Link href="/register">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="border-t bg-white dark:bg-slate-950">
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
