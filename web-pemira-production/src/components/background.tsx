import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

const Bg = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute z-0 h-full w-full bg-cream opacity-80",
        className,
      )}
      {...props}
    ></div>
  );
};

export default Bg;
