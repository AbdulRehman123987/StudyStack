import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const db = await getDBConnection();
    const { id } = await params;

    const [notes] = await db.execute("SELECT * FROM notes WHERE id = ?", [id]);
    if (!notes.length) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const note = notes[0];

    note.file_urls =
      typeof note.file_urls === "string"
        ? JSON.parse(note.file_urls)
        : note.file_urls;

    const [users] = await db.execute(
      "SELECT id, name, email FROM users WHERE id = ?",
      [note.uploaded_by]
    );
    note.uploaded_by = users[0] || null;

    // const [comments] = await db.execute(`
    //   SELECT comments.*, users.name, users.image
    //   FROM comments
    //   JOIN users ON comments.user_id = users.id
    //   WHERE note_id = ? ORDER BY created_at ASC
    // `, [id]);

    return NextResponse.json({ note });
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
