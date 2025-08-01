import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userId, noteId } = await req.json();

  const db = await getDBConnection();

  await db.query("INSERT IGNORE INTO likes (user_id, note_id) VALUES (?, ?)", [
    userId,
    noteId,
  ]);

  return NextResponse.json({ success: true });
}
