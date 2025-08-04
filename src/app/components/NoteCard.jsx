import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function NoteCard({ note, isliked, currentUser, onDelete }) {
  const getShortDescription = (text) => {
    if (!text) return "";
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/notes/like/${currentUser.id}/${note.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        onDelete?.(note.id);
        console.log("Note unliked successfully");
      } else {
        console.error("Failed to unlike note:", data.message);
      }
    } catch (error) {
      console.error("Error while unliking note:", error);
    }
  };

  return (
    <div className="w-[290px] h-[370px] relative">
      {isliked && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDelete(e);
          }}
          className="w-[40px] h-[40px] flex justify-center items-center rounded-3xl bg-red-700 absolute top-4 right-4 cursor-pointer"
        >
          <Trash2 />
        </div>
      )}

      <Link href={`/browse/${note.id}`}>
        <Card
          className="overflow-hidden rounded-xl shadow-md p-0 cursor-pointer h-full"
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
              {getShortDescription(note.description)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
