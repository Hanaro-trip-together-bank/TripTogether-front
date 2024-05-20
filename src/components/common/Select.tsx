import { useState } from "react";
import { HStack } from "./Stack";
import cn from "../../utils/cn";

interface SelectProps {
  className?: string;
  options: string[];
  onSelect: (value: number) => void;
}

function Select({ className = "", options, onSelect }: SelectProps) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const select = (idx: number) => {
    setSelectedOption(idx);
    onSelect(idx);
  };

  const baseClassName = "bg-gray-100 rounded-md p-0.5 w-fit";
  // 나머지 클래스네임
  const processedClassName = cn(baseClassName, className);

  const selectedOptionClassName =
    "px-4 py-2 text-sm font-bold bg-white rounded-md text-black transition-all";
  const notSelectedOptionClassName =
    "px-4 py-2 text-sm text-gray-500 transition-all";

  return (
    <HStack className={processedClassName}>
      {options.map((option, idx) => (
        <button
          key={option}
          onClick={() => select(idx)}
          className={
            selectedOption == idx
              ? selectedOptionClassName
              : notSelectedOptionClassName
          }
          disabled={selectedOption == idx}
        >
          {option}
        </button>
      ))}
    </HStack>
  );
}

export default Select;
