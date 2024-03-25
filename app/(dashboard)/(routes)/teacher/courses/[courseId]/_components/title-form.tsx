"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast"; 
import { Pencil } from "lucide-react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const titleSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required",
  }),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof titleSchema>) => {
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
        <h1>Course Title</h1>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {" "}
              <Pencil className="w-4 h-4 mr-2" /> Edit{" "}
            </>
          )}
        </Button>
      </article>
      {!isEditing && <span className="text-sm mt-2 text-gray-700">{initialData.title}</span>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={initialData.title}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <section className="flex items-center justify-start">
              <Button
                variant={"default"}
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                Save
              </Button>
            </section>
          </form>
        </Form>
      )}
    </section>
  );
};

export default TitleForm;
