"use client";

import { createContext, useEffect, useState } from "react";

export const NoteContext = createContext();

export default function NoteProvider({ children }) {
  const [allNotes, setAllNotes] = useState([]);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch("/api/notes/allNotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAllNotes(data.notes);
      } else {
        console.error("Failed to fetch notes:", data.error);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ allNotes }}>{children}</NoteContext.Provider>
  );
}
