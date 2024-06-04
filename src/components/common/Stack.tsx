import { HTMLAttributes, PropsWithChildren } from "react";
import cn from "../../utils/cn";
interface StackProps extends HTMLAttributes<HTMLDivElement> {
  rotated?: boolean;
}

export const VStack = (props: PropsWithChildren<StackProps>) => {
  const { children, className = "", rotated, ...attributes } = props;
  return (
    <div
      {...attributes}
      className={cn("flex gap-1", rotated ? "flex-row" : "flex-col", className)}
    >
      {children}
    </div>
  );
};

export const HStack = (props: PropsWithChildren<StackProps>) =>
  VStack({ ...props, rotated: !props.rotated });

export const Spacer = () => <div className="flex-grow" />;
