import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Info, Users, Bell, Settings } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white dark:bg-slate-950">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Info className="h-6 w-6 text-slate-600 dark:text-slate-400" />
            <span className="text-xl font-bold">VisionBoard</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-slate-900 dark:text-slate-50">
              Home
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
        <section className="flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Welcome to <span className="text-slate-700 dark:text-slate-300">VisionBoard</span>
          </h1>
          <p className="mt-4 max-w-[700px] text-slate-600 dark:text-slate-400 md:text-xl">
            A digital interactive information board providing structured access based on user roles.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Explore Dashboard <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Register Now
              </Button>
            </Link>
          </div>
        </section>
        <section className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <CardTitle>Guest Access</CardTitle>
              </div>
              <CardDescription>View static information without registration</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Explore general organizational details and public announcements without the need to create an account.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/guest" className="w-full">
                <Button variant="outline" className="w-full">
                  Browse as Guest
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <CardTitle>User Access</CardTitle>
              </div>
              <CardDescription>Access organization-specific content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View announcements, search for information, and check upcoming events as a registered user.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <CardTitle>Admin Access</CardTitle>
              </div>
              <CardDescription>Manage events and publish announcements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Create and manage events, update information, and publish announcements with interactive display
                options.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/login?role=admin" className="w-full">
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                <CardTitle>SuperAdmin Access</CardTitle>
              </div>
              <CardDescription>Complete system control</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Manage administrator accounts and have overarching control over the entire system.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/login?role=superadmin" className="w-full">
                <Button variant="outline" className="w-full">
                  SuperAdmin Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </section>
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
