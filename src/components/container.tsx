import { cn } from "~/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Readonly<ContainerProps>) => {
  return (
    <div className={cn("mx-auto max-w-[min(87vw,111rem)]", className)}>
      {children}
    </div>
  );
};

export { Container };
