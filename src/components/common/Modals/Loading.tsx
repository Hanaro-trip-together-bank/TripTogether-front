import { HStack, VStack } from "../Stack";
import cn from "../../../utils/cn";

interface LoadingProps {
  show: boolean;
  label?: string;
}

function Loading({ show, label = "" }: LoadingProps) {
  return (
    <VStack
      className={cn(
        "absolute top-0 left-0 w-iPhone h-iPhone z-30 rounded-3xl transition-opacity justify-center items-center  backdrop-blur-sm bg-black/70",
        show ? "pointer-events-auto" : "pointer-events-none opacity-0 delay-300"
      )}
    >
      <HStack>
        <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_000ms]" />
        <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_100ms]" />
        <div className="w-3 h-3 rounded-full bg-primary animate-[bounce2_1s_infinite_200ms]" />
      </HStack>
      <span className="text-white">{label}</span>
    </VStack>
  );
}

export default Loading;
