import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const userId = await params.userId;

  const db = await getDBConnection();
  const [rows] = await db.execute(
    `SELECT notes.* FROM notes 
     JOIN likes ON notes.id = likes.note_id 
     WHERE likes.user_id = ?`,
    [userId]
  );

  return NextResponse.json(rows);
}
