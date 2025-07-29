"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; // optional: for social buttons
import { Instagram, Music2 } from "lucide-react"; // or use your own icons
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo and description */}
        <div className="col-span-1 space-y-4">
          <img src="/logo.png" alt="Site Logo" width={100} height={40} />
          <p className="text-sm">
            Share your study notes, summaries, flashcards, study guides, and
            other learning resources with fellow students. Our platform makes it
            easy for learners to find and download helpful materials to support
            their studies — completely free.{" "}
          </p>
          <p className="text-xs text-gray-400">
            © YourCompany 2010–2025
            <br />
            Company Registration Number: 12345678
          </p>
          <div className="flex gap-3 pt-2">
            <Button variant="ghost" size="icon">
              <Instagram className="w-5 h-5 text-white" />
            </Button>
            <Button variant="ghost" size="icon">
              <Music2 className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div>
          <h3 className="font-semibold mb-2">Platform</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="#">Stuvia in a nutshell</Link>
            </li>
            <li>
              <Link href="#">Sell on Stuvia</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Help & Support</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="#">Satisfaction guarantee</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
            <li>
              <Link href="#">Chat with us</Link>
            </li>
            <li>
              <Link href="#">Study guide</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Policy</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="#">Copyright Center</Link>
            </li>
            <li>
              <Link href="#">Code of Honor</Link>
            </li>
            <li>
              <Link href="#">Community Guidelines</Link>
            </li>
            <li>
              <Link href="#">Notice & Takedown</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Latest Content</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link href="#">All Schools</Link>
            </li>
            <li>
              <Link href="#">New Notes</Link>
            </li>
            <li>
              <Link href="#">New Reviews</Link>
            </li>
            <li>
              <Link href="#">Standardized Tests</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
