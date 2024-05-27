import cn from "../../utils/cn";

interface ToggleProps {
  selected?: boolean;
  label?: string;
  onClick: () => void;
}

function Toggle({ selected = false, label, onClick }: ToggleProps) {
  return (
    <button
      className="flex flex-row gap-2 w-fit p-1 items-center"
      onClick={onClick}
    >
      <div
        className={cn(
          "w-8 h-4 rounded-full transition-all flex flex-row items-center",
          selected ? "bg-primary" : "bg-primary-disabled pl-3"
        )}
      >
        <div className={cn("w-5 h-5 shadowed bg-white rounded-full")} />
      </div>
      {label && <span className="leading-none">{label}</span>}
    </button>
  );
}

export default Toggle;
