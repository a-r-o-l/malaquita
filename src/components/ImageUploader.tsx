"use client";
import React, { useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Camera } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

function ImageUploader() {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const imgSrc = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    } else {
      return "./placeholder.png";
    }
  }, [file]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      console.log("File uploaded successfully", result);
    } else {
      console.error("File upload failed", await response.text());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <Avatar className="h-40 w-40 rounded-md border-4 justify-center items-center">
          <AvatarImage src={imgSrc} />
        </Avatar>
        <Button
          className="absolute top-32 left-32 text-muted-foreground rounded-full w-8 h-8 bg-black text-white"
          size="icon"
          variant="outline"
          onClick={() => imageInputRef.current?.click()}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <input
          className="hidden"
          ref={imageInputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </div>
      {/* <Button type="submit">Upload</Button> */}
    </form>
  );
}

export default ImageUploader;
