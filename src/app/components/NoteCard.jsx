import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NoteCard({
  note,
  isliked,
  currentUser,
  onRemoveLike,
  uploadedByMe,
  onDeleteNote,
}) {
  const router = useRouter();
  const getShortDescription = (text) => {
    if (!text) return "";
    return text.length > 100 ? text.slice(0, 100) + "..." : text;
  };

  const handleRemoveLikePro = async (e) => {
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
        onRemoveLike?.(note.id);
        console.log("Note unliked successfully");
      } else {
        console.error("Failed to unlike note:", data.message);
      }
    } catch (error) {
      console.error("Error while unliking note:", error);
    }
  };

  const handleDeletePro = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/notes/delete/${currentUser.id}/${note.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        onDeleteNote?.(note.id);
        console.log("Note delete successfully");
      } else {
        console.error("Failed to delete note:", data.message);
      }
    } catch (error) {
      console.error("Error while delete note:", error);
    }
  };

  return (
    <div className="w-[290px] h-[370px] relative">
      {isliked && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleRemoveLikePro(e);
          }}
          className="w-[40px] h-[40px] flex justify-center items-center rounded-3xl bg-red-700 absolute top-4 right-4 cursor-pointer"
        >
          <Trash2 />
        </div>
      )}

      {uploadedByMe && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleDeletePro(e);
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
