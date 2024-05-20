import { ButtonHTMLAttributes } from "react";
import cn from "../../utils/cn";

interface XButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  white?: boolean;
}

function XButton({ white = false, className = "", ...props }: XButtonProps) {
  return (
    <button
      className={cn(
        "h-fit w-fit p-2",
        className,
        white ? "text-white" : "text-black"
      )}
      {...props}
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

export default XButton;
