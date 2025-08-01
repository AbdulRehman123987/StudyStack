"use client";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NoteCard from "../components/NoteCard";

export default function DashboardPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);

  const myNotes = allNotes.filter(
    (note) => note.uploaded_by == currentUser?.id
  );
  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">85</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
