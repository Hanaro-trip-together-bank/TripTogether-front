/* eslint-disable jsx-a11y/no-static-element-interactions */
import cn from "../../utils/cn";
import currentTime from "../../utils/currentTime";
import { HStack, VStack } from "./Stack";

interface AlarmProps {
  show?: boolean;
  title: string;
  body: string;
  onClickAlarm: () => void;
}
function Alarm({ show = false, title, body, onClickAlarm }: AlarmProps) {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={onClickAlarm}
      className="absolute z-50 w-full p-4 pointer-events-none rounded-xl"
    >
      <HStack
        className={cn(
          "items-center w-full h-24 bg-white/75 backdrop-blur-md shadowed rounded-3xl p-4 gap-4 transition-all ease-in-out duration-200 pointer-events-auto",
          show ? "" : "-translate-y-32 opacity-0"
        )}
      >
        <img className="h-12" src={`/images/app.png`} alt="app" />
        <VStack className="h-full !gap-0">
          <span className="font-bold">{title}</span>
          <span className="leading-none line-clamp-2">{body}</span>
        </VStack>
        <span className="h-full text-gray-500 text-nowrap">
          {currentTime()}
        </span>
      </HStack>
    </div>
  );
}
export default Alarm;
