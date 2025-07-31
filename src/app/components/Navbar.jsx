"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, currentUser } = useContext(AuthContext);

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

        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6">
            <NavigationMenuItem>
              {isAuthenticated ? (
                <Link
                  href="/browse"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Browse
                </Link>
              ) : (
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Home
                </Link>
              )}
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Buttons */}
        {isAuthenticated ? (
          <div className="flex justify-center items-center gap-2">
            <h1 className=" text-lg font-medium">{currentUser?.name}</h1>
            <Link href="/dashboard">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ) : (
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
        )}
      </div>
    </header>
  );
}
