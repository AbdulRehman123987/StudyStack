import { getDBConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    const db = await getDBConnection();
    const [existing] = await db.execute(
      "SELECT name, email FROM users WHERE id = ?",
      [userId]
    );

    if (!existing.length) {
      return NextResponse.json({ error: "No user found!" }, { status: 409 });
    }

    const user = existing[0];

    const response = NextResponse.json(user);

    return response;
  } catch (error) {
    console.log(error);
  }
}
