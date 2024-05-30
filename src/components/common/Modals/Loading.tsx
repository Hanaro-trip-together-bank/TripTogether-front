import cn from "../../../utils/cn";
import { HStack } from "../Stack";

interface LoadingProps {
  show: boolean;
  label?: string;
}

function Loading({ show, label = "" }: LoadingProps) {
  return (
    <HStack
      className={cn(
        "absolute top-0 left-0 w-iPhone h-iPhone z-30 rounded-3xl transition-opacity justify-center items-center  backdrop-blur-sm bg-black/50",
        show ? "pointer-events-auto" : "pointer-events-none opacity-0"
      )}
    >
      <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_000ms]" />
      <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_100ms]" />
      <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_200ms]" />
    </HStack>
  );
}

export default Loading;
