"use client";
import { useContext } from "react";
import { AutoCarousel } from "../components/AutoCarousal";
import SearchBar from "../components/SearchBar";
import Slider from "../components/Slider";
import { NoteContext } from "@/context/NoteContext";

export default function Browse() {
  const { allNotes } = useContext(NoteContext);
  const scienceNotes = allNotes.filter((note) => note.subject == "science");
  const mathNotes = allNotes.filter((note) => note.subject == "math");
  const historyNotes = allNotes.filter((note) => note.subject == "history");
  const computerNotes = allNotes.filter((note) => note.subject == "cs");
  return (
    <>
      <AutoCarousel />
      <SearchBar />
      <Slider title={"Science"} Notes={scienceNotes} />
      <Slider title={"Math"} Notes={mathNotes} />
      <Slider title={"History"} Notes={historyNotes} />
      <Slider title={"Computer Science"} Notes={computerNotes} />
    </>
  );
}
