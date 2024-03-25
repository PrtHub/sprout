import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const backgroundVariants = cva("flex item-center justify-center rounded-full", {
  variants: {
    variant: {
      default: "bg-[#ff5349] bg-opacity-10",
    },
    size: {
      default: "p-2",
      sm: "p-1",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariants = cva("", {
  variants: {
    variant: {
      default: "text-[#ff5349] ",
    },
    size: {
      default: "w-8 h-8",
      sm: "w-4 h-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadgeProps) => {
  return (
    <section className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </section>
  );
};
