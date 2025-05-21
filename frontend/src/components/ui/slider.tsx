import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const sliderVariants = cva("relative w-full h-1 rounded bg-white/40", {
  variants: {
    variant: {
      default: "",
      withHover: "hover:h-2 transition-all ease-in-out",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type SliderProps = {
  position: number;
  bufferedPosition?: number;
  variant?: VariantProps<typeof sliderVariants>["variant"];
  className?: string;
  onClick: (position: number) => void;
};

const Slider = ({
  position,
  bufferedPosition,
  variant,
  className,
  onClick,
}: SliderProps) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const percentagePosition = `${position * 100}%`;
  const percentageBuffered = `${(bufferedPosition || 0) * 100}%`;

  const handleClickSlider = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.offsetWidth;
    const offsetX = e.clientX - sliderRef.current.getBoundingClientRect().left;
    const newPosition = Math.max(0, Math.min(1, offsetX / width));

    console.log({ newPosition });
    onClick(newPosition);
  };

  return (
    <div
      className={cn("relative px-2 cursor-pointer", className)}
      onClick={handleClickSlider}
    >
      <div ref={sliderRef} className={cn(sliderVariants({ variant }))}>
        {!!bufferedPosition && (
          <div
            className="absolute top-0 h-full rounded bg-white/40"
            style={{ width: percentageBuffered }}
          />
        )}
        <div
          className="absolute top-0 h-full rounded bg-white"
          style={{ width: percentagePosition }}
        />
      </div>
    </div>
  );
};

export default Slider;
