"use client";
import NoteCard from "./NoteCard";

export default function Slider({ title, Notes }) {
  return (
    <>
      <div className="w-[90%] mx-auto my-2">
        <h2 className=" text-4xl font-medium mb-8">{title}</h2>
        <div className="flex gap-4 overflow-x-auto px-4 pb-8">
          {Notes?.map((note, index) => (
            <div key={index}>
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
