import { HTMLAttributes, PropsWithChildren } from "react";
import cn from "../../utils/cn";

interface TitleProps extends HTMLAttributes<HTMLDivElement> {}

function Title({ children, className = "" }: PropsWithChildren<TitleProps>) {
  const baseClassName = "font-bold text-lg text-center mb-2";
  const processedClassName = cn(baseClassName, className);
  return <span className={processedClassName}>{children}</span>;
}

export default Title;
