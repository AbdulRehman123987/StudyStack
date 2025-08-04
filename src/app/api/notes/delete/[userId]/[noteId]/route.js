import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";

export async function DELETE(req, { params }) {
  const { userId, noteId } = await params;

  try {
    const db = await getDBConnection();

    const [rows] = await db.execute(
      `SELECT * FROM notes WHERE id = ? AND uploaded_by = ?`,
      [noteId, userId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Note not found or not authorized." },
        { status: 404 }
      );
    }

    await db.execute(`DELETE FROM notes WHERE id = ? AND uploaded_by = ?`, [
      noteId,
      userId,
    ]);

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting note." },
      { status: 500 }
    );
  }
}
