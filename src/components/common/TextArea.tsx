import { TextareaHTMLAttributes, forwardRef } from "react";
import { HStack, VStack } from "./Stack";
import cn from "../../utils/cn";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  border?: boolean;
  largeRounded?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      className = "",
      label,
      border = false,
      largeRounded = false,
      ...rest
    } = props;
    const baseClassName = "resize-none border-gray-300 p-2 transition-all";
    const borderClassName = border ? "border" : "";
    const roundedClassName = largeRounded ? "rounded-3xl" : "rounded-md";
    const processedClassName = cn(
      baseClassName,
      borderClassName,
      roundedClassName
    );

    return (
      <VStack className={className}>
        {label && (
          <label className="font-bold" htmlFor={label}>
            {label}
          </label>
        )}
        <textarea
          id={label}
          ref={ref}
          className={processedClassName}
          {...rest}
        />
      </VStack>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
