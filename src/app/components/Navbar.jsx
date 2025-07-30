"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    console.log("Token:", token);
  }, []);
  return (
    <header className="w-full shadow-sm bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2">
          <img src="/logo.png" alt="site-logo" width={50} height={50} />
          <Link href="/" className="text-2xl font-semibold text-black">
            StudyStack
          </Link>
        </div>

        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6">
            <NavigationMenuItem>
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <Link
                href="/services"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Services
              </Link>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link href="/auth/login" className="cursor-pointer">
            <Button variant="outline" className="text-sm cursor-pointer px-8">
              Login
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="text-sm cursor-pointer px-8">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
