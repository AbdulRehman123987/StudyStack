"use client";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import NoteCard from "@/app/components/NoteCard";

export default function NotesPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);

  const myNotes = allNotes.filter((note) => note.uploaded_by == currentUser.id);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
      <div className="flex gap-4 flex-wrap">
        {myNotes &&
          myNotes.map((note, index) => (
            <div key={index}>
              <NoteCard note={note} />
            </div>
          ))}
      </div>
    </div>
  );
}
