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
    <button className={cn("text-gray-500 p-2 transition-all", rotation)}>
      ^
    </button>
  );
}

export default Arrow;
