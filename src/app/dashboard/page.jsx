"use client";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoteCard from "../components/NoteCard";

export default function DashboardPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);
  const [likedNotes, setLikedNotes] = useState([]);

  const myNotes = allNotes.filter(
    (note) => note.uploaded_by == currentUser?.id
  );

  useEffect(() => {
    const fetchLikedNotes = async () => {
      try {
        const response = await fetch(`/api/notes/like/${currentUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch liked notes");
        }

        const data = await response.json();
        setLikedNotes(data);
      } catch (error) {
        console.error("Error fetching liked notes:", error);
      }
    };

    if (currentUser?.id) {
      fetchLikedNotes();
    }
  }, [currentUser]);

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myNotes?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Liked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{likedNotes?.length || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Views</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">132</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
        <div className="w-full h-[400px] overflow-y-auto flex gap-2 flex-wrap">
          {myNotes?.map((note, index) => (
            <div key={index}>
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
