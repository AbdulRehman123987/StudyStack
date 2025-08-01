"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";

export default function NotesPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);

  const myNotes = allNotes.filter((note) => note.uploaded_by == currentUser.id);
  console.log(myNotes);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {myNotes &&
          myNotes.map((note) => (
            <Card
              className="overflow-hidden rounded-xl shadow-md p-0 cursor-pointer"
              key={note.id}
            >
              <img
                src={note.file_urls[0]?.url}
                alt="React Notes"
                className="w-full h-50 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {note.description}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
