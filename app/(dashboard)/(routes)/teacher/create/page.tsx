"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title is required",
  }),
});

const CreateCoursePage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses`, values);
      toast.success("Course title created")
    } catch (error) {
      console.log("Create-Course-Error" + error);
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="max-w-4xl mx-auto w-full h-full md:h-svh flex items-start md:items-center justify-center p-6 md:p-0">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-gray-500 text-sm mt-1">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg: Next JS 14 crash course"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="flex items-center gap-x-4">
              <Link href="/">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="default"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </span>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default CreateCoursePage;
