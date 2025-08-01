import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await getDBConnection();
    const [myNotes] = await db.execute("SELECT * FROM notes");

    if (!myNotes.length) {
      return NextResponse.json({ error: "No notes found" }, { status: 404 });
    }

    return NextResponse.json({ notes: myNotes }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
