"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Pencil } from "lucide-react";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format-price";

interface PriceFormProps {
  initialData: Course;
  courseId: string;
}

const priceSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const form = useForm<z.infer<typeof priceSchema>>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof priceSchema>) => {
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
        <h1>Course price</h1>
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {" "}
              <Pencil className="w-4 h-4 mr-2" /> Edit price{" "}
            </>
          )}
        </Button>
      </article>
      {!isEditing && (
        <span
          className={cn(
            "text-sm mt-2 text-gray-700 ",
            !initialData.price && "italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "No price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="set a price for your course"
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

export default PriceForm;
