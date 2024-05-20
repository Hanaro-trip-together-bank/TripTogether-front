import { useState } from "react";
import { HStack } from "./Stack";
import cn from "../../utils/cn";

interface Select2Props {
  className?: string;
  options: string[];
  onSelect: (value: number) => void;
}

function Select2({ className = "", options, onSelect }: Select2Props) {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const select = (idx: number) => {
    setSelectedOption(idx);
    onSelect(idx);
  };
  const baseClassName = "h-8 justify-evenly border-b border-gray-200";
  // 나머지 클래스네임
  const processedClassName = cn(baseClassName, className);

  const selectedOptionClassName =
    "font-bold border-b-2 border-black transition-all";
  const notSelectedOptionClassName = "transition-all";

  return (
    <HStack className={processedClassName}>
      {options.map((option, idx) => (
        <button
          key={idx}
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

export default Select2;
