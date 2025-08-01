"use client";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext } from "react";
import NoteCard from "@/app/components/NoteCard";

export default function LikeNotes() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);

  const myNotes = allNotes.filter((note) => note.uploaded_by == currentUser.id);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Liked Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
