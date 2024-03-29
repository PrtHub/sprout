import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentsForm from "./_components/attachments-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!course) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const requiredFields = [
    course?.title,
    course?.description,
    course?.price,
    course?.categoryId,
    course?.imageUrl,
  ];

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  return (
    <div className="p-6">
      <section>
        <span className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <p className="text-sm text-gray-600">
            Complete all fields {completionText}
          </p>
        </span>
      </section>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div className="flex flex-col gap-y-6">
          <span className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </span>
          <TitleForm initialData={course} courseId={course.id} />
          <DescriptionForm initialData={course} courseId={course.id} />
          <ImageForm initialData={course} courseId={course.id} />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="flex flex-col gap-y-6">
          <section className="space-y-3">
            <span className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </span>
            <section>Chapters</section>
          </section>
          <section className="space-y-3">
            <span className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </span>
            <PriceForm initialData={course} courseId={course.id} />
          </section>
          <section className="space-y-3">
            <span className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resources & Attachments</h2>
            </span>
           <AttachmentsForm initialData={course} courseId={course.id}/>
          </section>
        </div>
      </section>
    </div>
  );
};

export default CourseIdPage;
