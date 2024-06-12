import cn from "../../utils/cn";

interface ArrowProps {
  direction: "up" | "down" | "left" | "right";
  className?: string;
  strokeWidth?: number;
}

function Arrow({ direction, className = "", strokeWidth = 8 }: ArrowProps) {
  const rotation = (() => {
    switch (direction) {
      case "up":
        return "rotate-0";
      case "down":
        return "rotate-180";
      case "left":
        return "-rotate-90";
      case "right":
        return "rotate-90";
    }
  })();
  return (
    <div
      className={cn("text-gray-500 transition-all z-0", rotation, className)}
    >
      <svg
        width="16px"
        height="16px"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 60 L50 20 L90 60"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  );
}

export default Arrow;
