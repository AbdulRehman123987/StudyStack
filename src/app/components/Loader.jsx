"use client";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loader({ delay }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-10 w-full h-full bg-[#F2F0EF] flex flex-col items-center justify-center space-y-4">
      <div className="w-[80px] h-[80px]">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="w-full max-w-md">
        <Progress value={progress} />
      </div>
    </div>
  );
}
