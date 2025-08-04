"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/app/components/Loader";

export default function UploadNotesPage() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const isAllImages = fileList.every((file) =>
        file.type.startsWith("image/")
      );
      const isOnePdf =
        fileList.length === 1 && fileList[0].type === "application/pdf";

      if ((isAllImages && fileList.length <= 12) || isOnePdf) {
        setSelectedFiles(files);
      } else {
        alert("Please upload either up to 12 images or only 1 PDF.");
        e.target.value = "";
        setSelectedFiles(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const title = e.target.title.value;
      const description = e.target.description.value;
      const uploadedBy = localStorage.getItem("userID");

      if (!selectedFiles) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subject", subject);
      formData.append("uploadedBy", uploadedBy);

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }

      const res = await fetch("/api/notes/uploadNotes", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        e.target.reset();
        setSubject("");
        setSelectedFiles(null);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10">
      {loading ? (
        <Loader delay={200} />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-6">Upload Notes</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="title"
                className="mb-2 block text-base font-medium"
              >
                Note Title
              </Label>
              <Input
                id="title"
                required
                type="text"
                placeholder="Enter note title"
              />
            </div>

            <div>
              <Label
                htmlFor="subject"
                className="mb-2 block text-base font-medium"
              >
                Subject
              </Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="description"
                className="mb-2 block text-base font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                required
                placeholder="Write a short description about the notes..."
                rows={4}
              />
            </div>

            <div>
              <Label
                htmlFor="files"
                className="mb-2 block text-base font-medium"
              >
                Upload Files
              </Label>
              <Input
                id="files"
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleFileChange}
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload up to <strong>12 images</strong> or{" "}
                <strong>1 PDF</strong> only.
              </p>
            </div>

            <Button type="submit" className="w-full mt-4 cursor-pointer">
              Upload Notes
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
