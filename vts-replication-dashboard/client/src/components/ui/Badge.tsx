import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "success" | "danger" | "warning";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80":
            variant === "default",
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80":
            variant === "secondary",
          "text-foreground": variant === "outline",
          "border-transparent bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20":
            variant === "success",
          "border-transparent bg-red-500/15 text-red-500 hover:bg-red-500/25 border-red-500/20":
            variant === "danger",
          "border-transparent bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20":
            variant === "warning",
        },
        className
      )}
      {...props}
    />
  );
}
