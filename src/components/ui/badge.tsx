import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-blue-600 text-white shadow hover:bg-blue-700",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200",
        destructive:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-700",
        outline: "text-slate-800 border-slate-200",
        // Legal Risk & OrbitX Tokens
        highRisk:
          "bg-red-50 text-red-700 border border-red-200/80 font-semibold",
        mediumRisk:
          "bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold",
        lowRisk:
          "bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-semibold",
        aiPurple:
          "bg-purple-50 text-purple-700 border border-purple-200/80 font-semibold",
        growthGreen:
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold",
        navy:
          "bg-[#10182B] text-white border-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
