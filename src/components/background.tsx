import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface BgProps extends HTMLAttributes<HTMLDivElement> {
  backgroundImage?: string;
}

const Bg = ({ className, backgroundImage="/background-pemira-1.png", ...props }: BgProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-[-1] opacity-100 bg-cover bg-center",
        className
      )}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
      {...props}
    ></div>
  );
};

export default Bg;
