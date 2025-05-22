import { cn } from "@/lib/utils";

const Error = ({ isError }: { isError: boolean }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full flex justify-center items-center bg-black/40 text-sm text-neutral-400",
        isError ? "flex" : "hidden"
      )}
    >
      Something wrong when loading video file.
    </div>
  );
};

export default Error;
