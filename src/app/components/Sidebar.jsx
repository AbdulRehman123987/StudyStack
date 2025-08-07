"use client";

import Link from "next/link";
import { Home, User, FileText, Upload, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Notes", href: "/dashboard/notes", icon: FileText },
  { name: "Like Notes", href: "/dashboard/like-notes", icon: Heart },
  { name: "Upload Notes", href: "/dashboard/upload-notes", icon: Upload },
  // { name: "Profile", href: "/dashboard/profile", icon: User },
];

export default function Sidebar({ setLoading }) {
  const router = useRouter();
  const { refreshAuth, getUser, currentUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/logout");
      refreshAuth();
      localStorage.removeItem("userID");
      getUser();
      router.push("/auth/login");
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside className="w-64 h-screen relative shadow-md border-r border-gray-200 hidden md:block">
      <div className="p-6 font-bold text-xl">{currentUser?.name}</div>
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

      <Button
        className="w-full rounded-[5px] cursor-pointer absolute bottom-8"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </aside>
  );
}
