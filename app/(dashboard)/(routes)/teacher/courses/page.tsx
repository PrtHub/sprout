import { Button } from "@/components/ui/button";
import Link from "next/link";

const CoursesPage = () => {
  return (
    <section className="p-6">
      <Link href="/teacher/create">
        <Button variant="destructive">Create a New Course</Button>
      </Link>
    </section>
  );
};

export default CoursesPage;
