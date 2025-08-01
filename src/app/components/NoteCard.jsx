import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NoteCard({ note }) {
  return (
    <Link href={`/browse/${note.id}`}>
      <div className="w-[300px]">
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
      </div>
    </Link>
  );
}
