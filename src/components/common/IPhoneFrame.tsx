import { HTMLAttributes } from "react";
import { VStack } from "./Stack";
import cn from "../../utils/cn";

interface IPhoneFrameProps extends HTMLAttributes<HTMLDivElement> {}
function IPhoneFrame({ className = "", children, ...props }: IPhoneFrameProps) {
  const baseClassName =
    "relative w-iPhone h-iPhone shadowed -translate-y-12 iPhone:translate-y-0 iPhone:mt-2 iPhone:rounded-3xl iPhone:border-2 border-black overflow-hidden items-center !gap-0 box-content";
  const processedClassName = cn(baseClassName, className);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="">
        <VStack className={processedClassName} {...props}>
          {children}
        </VStack>
      </div>
    </div>
  );
}
export default IPhoneFrame;
