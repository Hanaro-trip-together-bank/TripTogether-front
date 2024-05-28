import { TextareaHTMLAttributes } from "react";
import { HStack, VStack } from "./Stack";
import cn from "../../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  border?: boolean;
  largeRounded?: boolean;
}

function TextArea({
  label,
  border = false,
  largeRounded = false,
  ...props
}: TextAreaProps) {
  const baseClassName = "resize-none border-gray-300 p-2 transition-all";
  const borderClassName = border ? "border" : "";
  const roundedClassName = largeRounded ? "rounded-3xl" : "rounded-md";
  const processedClassName = cn(
    baseClassName,
    borderClassName,
    roundedClassName
  );

  console.log(processedClassName);
  return (
    <VStack>
      {label && <span className="font-bold"> {label}</span>}
      <textarea className={processedClassName} {...props} />
    </VStack>
  );
}
export default TextArea;
