"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const { refreshAuth, getUser } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      setloading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      localStorage.setItem("userID", data.user.id);
      if (response.ok) {
        refreshAuth();
        getUser();
        router.push("/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {loading ? (
        <Loader delay={100} />
      ) : (
        <>
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left image section */}
            <div className="hidden md:block relative">
              <Image
                src="/hero.png"
                alt="Login Illustration"
                fill
                className="object-cover"
              />
            </div>

            {/* Right form section */}
            <div className="p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Welcome Back
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>
                </form>
              </Form>

              <p className="text-sm text-center text-gray-500 mt-6">
                Dont have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-black hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
