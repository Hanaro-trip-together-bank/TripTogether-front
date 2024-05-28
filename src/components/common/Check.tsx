import cn from "../../utils/cn";

interface CheckProps {
  checked?: boolean;
  onClick?: () => void;
}

function Check({ checked = false, onClick }: CheckProps) {
  return (
    <button
      className={cn(
        "border rounded-full p-1",
        checked
          ? "border-transparent bg-primary text-white"
          : "border-gray-500 text-gray-500"
      )}
      onClick={onClick}
    >
      {/* 동그라미 속 체크 */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polyline
          points="20 6 9 17 4 12"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </button>
  );
}

export default Check;
