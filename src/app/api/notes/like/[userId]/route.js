import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const userId = params.userId;

  const db = await getDBConnection();
  const [rows] = await db.execute(
    `SELECT notes.* FROM notes 
     JOIN likes ON notes.id = likes.note_id 
     WHERE likes.user_id = ?`,
    [userId]
  );

  return NextResponse.json(rows);
}

export async function DELETE(req, { params }) {
  const { userId, noteId } = params;

  try {
    const db = await getDBConnection();

    const [result] = await db.execute(
      `DELETE FROM likes WHERE user_id = ? AND note_id = ?`,
      [userId, noteId]
    );

    return NextResponse.json({
      success: true,
      message: "Note unliked successfully.",
    });
  } catch (error) {
    console.error("Error unliking note:", error);
    return NextResponse.json(
      { success: false, message: "Error unliking note." },
      { status: 500 }
    );
  }
}
