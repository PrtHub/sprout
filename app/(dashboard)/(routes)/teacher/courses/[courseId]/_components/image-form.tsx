"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { Course } from "@prisma/client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const ImageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: z.infer<typeof ImageSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="border rounded-md bg-gray-100 p-4">
      <article className="flex items-center justify-between font-medium">
        <h1>Course image</h1>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" /> Add an image
            </>
          )}
          {!isEditing && initialData?.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </article>
      {!isEditing &&
        (!initialData?.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-gray-200 rounded-md">
            <ImageIcon className="w-10 h-10 text-gray-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload Image"
              src={initialData.imageUrl}
              className="object-cover rounded-md"
              fill
            />
          </div>
        ))}
      {isEditing && (
        <>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </>
      )}
    </section>
  );
};

export default ImageForm;
