"use client";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar setLoading={setLoading} />
      {loading ? (
        <Loader delay={100} />
      ) : (
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      )}
    </div>
  );
}
