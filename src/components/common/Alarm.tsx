import cn from "../../utils/cn";
import { HStack, VStack } from "./Stack";

interface AlarmProps {
  show?: boolean;
}
function Alarm({ show = false }: AlarmProps) {
  return (
    <div className="absolute w-full rounded-xl p-4 z-50 pointer-events-none">
      <HStack
        className={cn(
          "items-center w-full h-24 bg-white/75 backdrop-blur-md shadowed rounded-3xl p-4 gap-4 transition-all ease-in-out duration-200 pointer-events-auto",
          show ? "" : "-translate-y-32 opacity-0"
        )}
      >
        <img className="h-12" src={`/images/app.png`} alt="app" />
        <VStack className="h-full !gap-0">
          <span className="font-bold">하나원큐</span>
          <span className="line-clamp-2 leading-none">
            하나로 모임으로 초대합니다. 하나로 모임으로 초대합니다. 하나로
            모임으로 초대합니다.
          </span>
        </VStack>
        <span className="text-gray-500 h-full text-nowrap">15:48</span>
      </HStack>
    </div>
  );
}
export default Alarm;
