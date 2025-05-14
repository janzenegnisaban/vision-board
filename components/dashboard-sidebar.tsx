"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { cn } from "@/lib/utils"
import { BarChart3, Calendar, ChevronRight, Home, Info, LogOut, Megaphone, Users } from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPERADMIN"
  const isSuperAdmin = user?.role === "SUPERADMIN"

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      active: pathname === "/dashboard",
    },
    {
      title: "Announcements",
      href: "/dashboard/announcements",
      icon: Megaphone,
      active: pathname === "/dashboard/announcements",
    },
    {
      title: "Events",
      href: "/dashboard/events",
      icon: Calendar,
      active: pathname === "/dashboard/events",
    },
    {
      title: "Information",
      href: "/dashboard/information",
      icon: Info,
      active: pathname === "/dashboard/information",
    },
  ]

  // Admin-only navigation items
  const adminNavItems = isAdmin
    ? [
        {
          title: "Create Announcement",
          href: "/dashboard/create-announcement",
          icon: Megaphone,
          active: pathname === "/dashboard/create-announcement",
        },
        {
          title: "Manage Events",
          href: "/dashboard/manage-events",
          icon: Calendar,
          active: pathname === "/dashboard/manage-events",
        },
        {
          title: "Analytics",
          href: "/dashboard/analytics",
          icon: BarChart3,
          active: pathname === "/dashboard/analytics",
        },
      ]
    : []

  // SuperAdmin-only navigation items
  const superAdminNavItems = isSuperAdmin
    ? [
        {
          title: "Manage Admins",
          href: "/dashboard/manage-admins",
          icon: Users,
          active: pathname === "/dashboard/manage-admins",
        },
      ]
    : []

  return (
    <div className="flex h-full flex-col border-r bg-slate-50 dark:bg-slate-900">
      <div className="p-6">
        <h2 className="text-2xl font-semibold tracking-tight">VisionBoard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {user?.role === "SUPERADMIN"
            ? "Super Admin Dashboard"
            : user?.role === "ADMIN"
              ? "Admin Dashboard"
              : "User Dashboard"}
        </p>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50",
                item.active ? "bg-slate-200 dark:bg-slate-800" : "hover:bg-slate-200 dark:hover:bg-slate-800",
                "transition-all",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}

          {adminNavItems.length > 0 && (
            <>
              <div className="my-2 px-3 py-2">
                <h3 className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Admin</h3>
                <div className="space-y-1">
                  {adminNavItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50",
                        item.active ? "bg-slate-200 dark:bg-slate-800" : "hover:bg-slate-200 dark:hover:bg-slate-800",
                        "transition-all",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {superAdminNavItems.length > 0 && (
            <>
              <div className="my-2 px-3 py-2">
                <h3 className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">Super Admin</h3>
                <div className="space-y-1">
                  {superAdminNavItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:text-slate-900 dark:text-slate-50 dark:hover:text-slate-50",
                        item.active ? "bg-slate-200 dark:bg-slate-800" : "hover:bg-slate-200 dark:hover:bg-slate-800",
                        "transition-all",
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.active && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-200 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-800 dark:hover:text-slate-50"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}
