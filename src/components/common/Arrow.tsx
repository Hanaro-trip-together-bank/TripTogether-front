import cn from "../../utils/cn";

interface ArrowProps {
  direction: "up" | "down" | "left" | "right";
}

function Arrow({ direction }: ArrowProps) {
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
    <div className={cn("text-gray-500 transition-all z-0", rotation)}>
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
          strokeWidth="8"
        />
      </svg>
    </div>
  );
}

export default Arrow;
