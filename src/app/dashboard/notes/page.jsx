import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploads } from "@/lib/uploads";

export default function NotesPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Uploads</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {uploads.map((upload, index) => (
          <Card
            className="overflow-hidden rounded-xl shadow-md p-0 cursor-pointer"
            key={index}
          >
            <img
              src="/notes.jpg"
              alt="React Notes"
              className="w-full h-50 object-cover"
            />
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{upload.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {upload.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
