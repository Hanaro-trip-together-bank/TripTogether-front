import { HTMLAttributes } from "react";
import { VStack } from "./Stack";
import StatusBar from "./TopBars/StatusBar";
import cn from "../../utils/cn";

interface IPhoneFrameProps extends HTMLAttributes<HTMLDivElement> {}
function IPhoneFrame({ className = "", children, ...props }: IPhoneFrameProps) {
  const baseClassName =
    "w-iPhone h-iPhone iPhone:mt-2 iPhone:rounded-3xl iPhone:border-2 border-black overflow-hidden items-center !gap-0";
  const processedClassName = cn(baseClassName, className);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <VStack className={processedClassName} {...props}>
        <StatusBar />
        {children}
      </VStack>
    </div>
  );
}
export default IPhoneFrame;
