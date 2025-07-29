"use client";

import Link from "next/link";
import { Home, User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Notes", href: "/dashboard/notes", icon: FileText },
  { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md border-r border-gray-200 hidden md:block">
      <div className="p-6 font-bold text-xl">Abdul Rehman</div>
      <nav className="flex flex-col space-y-2 p-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
