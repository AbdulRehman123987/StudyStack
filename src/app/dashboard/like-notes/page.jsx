"use client";
import { useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { NoteContext } from "@/context/NoteContext";
import { useContext, useEffect } from "react";
import NoteCard from "@/app/components/NoteCard";

export default function LikeNotes() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);
  const [likedNotes, setLikedNotes] = useState([]);
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
      console.log("Liked notes:", data);
      setLikedNotes(data);
    } catch (error) {
      console.error("Error fetching liked notes:", error);
    }
  };
  const handleNoteDelete = (deletedNoteId) => {
    fetchLikedNotes();
  };

  useEffect(() => {
    if (currentUser?.id) {
      fetchLikedNotes();
    }
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Liked Notes</h2>
      <div className="flex gap-4 flex-wrap">
        {likedNotes &&
          likedNotes.map((note, index) => (
            <div key={index}>
              <NoteCard
                note={note}
                isliked={true}
                currentUser={currentUser}
                onDelete={handleNoteDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
