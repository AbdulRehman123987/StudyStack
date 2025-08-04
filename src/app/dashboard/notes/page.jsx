"use client";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useEffect, useState } from "react";
import NoteCard from "@/app/components/NoteCard";

export default function NotesPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);
  const [myNotes, setMyNotes] = useState([]);
  const fetchMyLike = () => {
    const notes = allNotes.filter((note) => note.uploaded_by == currentUser.id);
    setMyNotes(notes);
  };
  const handleDelete = (deletedNoteId) => {
    setMyNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== deletedNoteId)
    );
  };

  useEffect(() => {
    fetchMyLike();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
      <div className="w-full h-[480px] overflow-y-auto flex gap-2 flex-wrap">
        {myNotes &&
          myNotes.map((note, index) => (
            <div key={index}>
              <NoteCard
                note={note}
                uploadedByMe={true}
                currentUser={currentUser}
                onDeleteNote={handleDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
