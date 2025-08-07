"use client";

import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { NoteContext } from "@/context/NoteContext";
import { AuthContext } from "@/context/AuthContext";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function NoteViewPage() {
  const { allNotes } = useContext(NoteContext);
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      setNote(data.note);
      setComments(data.comments);
    };
    fetchNote();
  }, [id]);

  const handleDownload = async () => {
    try {
      if (!note || !note.file_urls || note.file_urls.length === 0) return;

      const fileType = note.file_type;
      const files = note.file_urls;
      const doc = new jsPDF();

      for (let i = 0; i < files.length; i++) {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        await new Promise((resolve, reject) => {
          img.onload = () => {
            const imgWidth = 190;
            const imgHeight = (img.height * imgWidth) / img.width;

            doc.addImage(img, "JPEG", 10, 10, imgWidth, imgHeight);

            if (i !== files.length - 1) doc.addPage();

            resolve();
          };
          img.onerror = (err) => {
            console.error("Image load failed:", err);
            reject(err);
          };
          img.src = files[i].url;
        });
      }

      doc.save(`${note.title || "note"}.pdf`);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

  const handleLike = async () => {
    await fetch(`/api/notes/like`, {
      method: "POST",
      body: JSON.stringify({ userId: currentUser.id, noteId: note.id }),
      headers: { "Content-Type": "application/json" },
    });
    toast("Your message", {
      duration: 2000,
      position: "top-right",
      description: "Added to your liked notes",
      style: {
        backgroundColor: "#000000",
        color: "#fff",
      },
    });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`/api/notes/${id}/comment`, {
      method: "POST",
      body: JSON.stringify({ text: newComment, user_id: currentUser.id }),
      headers: { "Content-Type": "application/json" },
    });
    const added = await res.json();
    setComments((prev) => [...prev, added.comment]);
    setNewComment("");
  };

  if (!note)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <img src="/loading.png" alt="loader-image" />
      </div>
    );

  return (
    <div className="w-[90%] mx-auto p-4">
      {/* Note Images */}
      <Carousel className="w-full  mx-auto mb-8">
        <CarouselContent>
          {note?.file_urls?.map((file, idx) => (
            <CarouselItem key={idx} className="flex justify-center">
              <img
                src={file.url}
                alt={`Note page ${idx + 1}`}
                className="rounded-xl w-full h-[400px] object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>

      {/* Title + Description */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{note.title}</h1>
        <p className="text-gray-600 mt-2">{note.description}</p>
      </div>

      {/* Uploader Info + Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <img
            src="/avatar.jpg"
            alt="uploader-image"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{note.uploaded_by?.name}</p>
            <p className="text-sm text-gray-500">Uploader</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            Download
          </button>
          <button
            onClick={handleLike}
            className="bg-pink-800 cursor-pointer text-white px-4 py-2 rounded-lg"
          >
            ❤️ Like
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-black cursor-pointer text-white px-4 py-2 mt-2 rounded-lg"
          >
            Add Comment
          </button>
        </div>

        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic">No comments yet.</p>
          ) : (
            comments.map((cmt, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src="/avatar.jpg"
                    alt={`${cmt.name}-avatar`}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">
                      {cmt.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {new Date(cmt.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {cmt.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
