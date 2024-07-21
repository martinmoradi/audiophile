import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";
import { ChevronRightIcon } from "~/components/icons/chevron-right";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-xs ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/90 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase font-bold",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-secondary",
        destructive: "bg-red text-white hover:bg-red/75",
        secondary:
          "bg-transparent text-black border border-black hover:bg-black hover:text-white hover:border-none",
        link: "text-black opacity-50 hover:text-primary hover:opacity-100",
      },
      size: {
        default: "h-[4.8rem] w-[16rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
        {variant === "link" && <ChevronRightIcon className="ml-4" />}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
