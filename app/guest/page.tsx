import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Calendar, Info } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function GuestPage() {
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
            <Link href="/guest" className="text-sm font-medium text-slate-900 dark:text-slate-50">
              Guest View
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
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
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Welcome to the Guest View</h1>
          <p className="mt-4 max-w-[700px] text-slate-600 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Access public information without registration
          </p>
        </section>

        <Tabs defaultValue="announcements" className="space-y-8">
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="about">About Us</TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Public Announcements</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <CardTitle className="text-lg">Public Announcement {i}</CardTitle>
                    </div>
                    <CardDescription>
                      Posted {i} day{i !== 1 ? "s" : ""} ago
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      This is a public announcement visible to all visitors. It contains general information about our
                      organization and upcoming public events.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Want to see more announcements and personalized content?
              </p>
              <Link href="/register">
                <Button>Register Now</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">Upcoming Public Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <CardTitle className="text-lg">Public Event {i}</CardTitle>
                    </div>
                    <CardDescription>May {10 + i * 5}, 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      Join us for this public event. Open to everyone interested in learning more about our
                      organization.
                    </p>
                    <div className="text-xs text-slate-500">
                      <div>Time: 10:00 AM - 12:00 PM</div>
                      <div>Location: Main Hall</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Register to get notified about exclusive events!
              </p>
              <Link href="/register">
                <Button>Register Now</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-6">About Our Organization</h2>
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Our organization is dedicated to providing valuable information and resources to our community. We
                  strive to create an environment where knowledge is accessible to everyone.
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Founded in 2020, we have grown to become a leading platform for information sharing and community
                  engagement. Our digital information board, VisionBoard, is designed to make important announcements
                  and events easily accessible to all stakeholders.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  We believe in transparency, accessibility, and the power of information to transform lives and
                  organizations.
                </p>
              </CardContent>
            </Card>
            <div className="text-center mt-8">
              <p className="text-slate-600 dark:text-slate-400 mb-4">Want to be part of our community?</p>
              <Link href="/register">
                <Button>Join Us Today</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
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
