import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import cn from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  gray?: boolean;
  roundedFull?: boolean;
}

function Button({
  gray = false,
  disabled = false,
  roundedFull = false,
  className = "",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const baseClassName = "text-white transition-all p-2 px-8 w-fit h-fit";
  // 배경색
  const bgClassName = disabled || gray ? "bg-primary-disabled" : "bg-primary";
  // 마우스커서
  const cursorClassName = disabled ? "cursor-default" : "";
  // 코너 라운드 처리
  const roundedClassName = roundedFull ? "rounded-full" : "rounded-md";
  // 나머지 클래스네임
  const processedClassName = cn(
    baseClassName,
    bgClassName,
    cursorClassName,
    roundedClassName,
    className
  );

  return (
    <button className={processedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
