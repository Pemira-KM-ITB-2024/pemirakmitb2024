import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const Bg = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat",
        className,
      )}
      {...props}
    ></div>
  );
};

export default Bg;
