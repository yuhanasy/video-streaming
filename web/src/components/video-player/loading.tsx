import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 w-full h-full flex justify-center items-center bg-black/40",
        isLoading ? "flex" : "hidden"
      )}
    >
      <LoaderCircleIcon size={64} className="animate-spin text-white" />
    </div>
  );
};

export default Loading;
