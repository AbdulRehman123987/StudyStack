import { NextResponse } from "next/server";
import { getDBConnection } from "@/lib/db";
import cloudinary from "@/lib/cloudinary";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import fs from "fs";

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const subject = formData.get("subject");
  const description = formData.get("description");
  const uploadedBy = formData.get("uploadedBy");
  const files = formData.getAll("files");

  if (!title || !subject || !description || !uploadedBy || files.length === 0) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const uploads = [];

    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempFilePath = path.join(tempDir, `${nanoid()}-${file.name}`);
      await writeFile(tempFilePath, buffer);

      const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
        resource_type: file.type === "application/pdf" ? "raw" : "image",
        folder: "student_notes",
      });

      await unlink(tempFilePath);

      uploads.push({
        url: uploadResult.secure_url,
        type: file.type,
        public_id: uploadResult.public_id,
      });
    }

    const db = await getDBConnection();

    await db.execute(
      `INSERT INTO notes (title, subject, description, file_type, file_urls, uploaded_by) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        subject,
        description,
        files[0].type === "application/pdf" ? "pdf" : "image",
        JSON.stringify(uploads),
        uploadedBy,
      ]
    );

    return NextResponse.json(
      { success: true, files: uploads },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
