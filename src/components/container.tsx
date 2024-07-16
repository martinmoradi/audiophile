import { cn } from "~/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Readonly<ContainerProps>) => {
  return (
    <div className={cn("mx-auto max-w-[111rem] px-12", className)}>
      {children}
    </div>
  );
};

export { Container };
