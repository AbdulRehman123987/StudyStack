import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const db = await getDBConnection();
    const { id: note_id } = params;
    const { user_id, text } = await req.json();

    if (!text || !user_id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await db.execute(
      "INSERT INTO comments (note_id, user_id, text) VALUES (?, ?, ?)",
      [note_id, user_id, text]
    );

    const [newComment] = await db.execute(
      `SELECT comments.id, comments.text, comments.created_at, users.name
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.note_id = ? AND comments.user_id = ? ORDER BY comments.id DESC LIMIT 1`,
      [note_id, user_id]
    );

    return NextResponse.json({ comment: newComment[0] }, { status: 201 });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
