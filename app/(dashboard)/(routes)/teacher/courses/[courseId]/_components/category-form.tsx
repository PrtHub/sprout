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
import { Course } from "@prisma/client";
import { ComboboxDemo } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

interface CategoryFormProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
}

const categoryIdSchema = z.object({
  categoryId: z.string().min(1),
});

const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const form = useForm<z.infer<typeof categoryIdSchema>>({
    resolver: zodResolver(categoryIdSchema),
    defaultValues: {
      categoryId: initialData.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof categoryIdSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.categoryId
  );
  return (
    <section className="border rounded-md bg-gray-100 p-4">
      <article className="flex items-center justify-between font-medium">
        <h1>Course Category</h1>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {" "}
              <Pencil className="w-4 h-4 mr-2" /> Edit category{" "}
            </>
          )}
        </Button>
      </article>
      {!isEditing && (
        <span
          className={cn(
            "text-sm mt-2 text-gray-700 ",
            !initialData.categoryId && "italic"
          )}
        >
          {selectedOption?.label || "No category"}
        </span>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ComboboxDemo options={options} {...field} />
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

export default CategoryForm;
