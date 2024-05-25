import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "../../utils/cn";

interface OptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

function Option({
  children,
  selected = false,
  className = "",
  ...props
}: PropsWithChildren<OptionProps>) {
  const baseClassName =
    "text-sm font-bold rounded-full transition-all p-1 px-2.5 w-fit mr-2 border-2 border-transparent";
  // 선택 처리
  const selectedClassName = selected
    ? "bg-white text-primary border-primary"
    : "bg-gray-100 text-black";
  // 나머지 클래스네임
  const processedClassName = cn(baseClassName, selectedClassName, className);

  return (
    <button className={processedClassName} disabled={selected} {...props}>
      {children}
    </button>
  );
}

export default Option;
