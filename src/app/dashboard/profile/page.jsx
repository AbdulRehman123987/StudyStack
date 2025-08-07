"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Frontend Developer | React Enthusiast | UI Designer",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile({ ...profile, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen  flex justify-center items-start p-6">
      <Card className="w-full max-w-4xl shadow-xl bg-white rounded-2xl p-6 space-y-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-32 h-32 border shadow">
            <AvatarImage src={profile.image || "/avatar-placeholder.png"} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            className="mt-2 w-48 text-sm"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Name</Label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Bio</Label>
            <Textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Tell us something about yourself..."
            />
          </div>
        </CardContent>

        <div className="text-end px-4">
          <Button className="px-6">Update Profile</Button>
        </div>
      </Card>
    </div>
  );
}
