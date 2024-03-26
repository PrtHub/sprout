"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  File,
  ImageIcon,
  Loader,
  Loader2,
  Pencil,
  PlusCircle,
  X,
} from "lucide-react";

import { Attachment, Course } from "@prisma/client";

import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AttachmentsFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const attachmentSchema = z.object({
  url: z.string().min(1),
});

const AttachmentsForm = ({ initialData, courseId }: AttachmentsFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = async (values: z.infer<typeof attachmentSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="border rounded-md bg-gray-100 p-4">
      <article className="flex items-center justify-between font-medium">
        <h1>Course Attachments</h1>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData?.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" /> Add a file
            </>
          )}
        </Button>
      </article>

      {!isEditing && (
        <>
          {initialData?.attachments.length === 0 && (
            <p className="text-sm italic text-gray-600 mt-2">
              No attachments yet
            </p>
          )}
          {initialData?.attachments.length > 0 && (
            <section className="space-y-2 mt-4">
              {initialData?.attachments.map((attachment) => (
                <section
                  key={attachment.id}
                  className="flex items-center gap-x-2 p-3 w-full bg-orange/5 border text-gray-700 border-orange/60 rounded-md"
                >
                  <File className="w-4 h-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      onClick={() => onDelete(attachment.id)}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </section>
              ))}
            </section>
          )}
        </>
      )}

      {isEditing && (
        <>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add anything your students might need to complete the course.
          </div>
        </>
      )}
    </section>
  );
};

export default AttachmentsForm;
