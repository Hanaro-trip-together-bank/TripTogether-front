import { useState } from "react";

function useKeypadMappedNumber(num = 0) {
  const [amount, setAmount] = useState(num);

  const append = (number: number) => {
    setAmount(amount * 10 + number);
  };
  const remove = () => {
    setAmount(Math.floor(amount / 10));
  };
  const add = (number: number) => {
    setAmount(amount + number);
  };
  const clear = () => {
    setAmount(0);
  };
  const set = (num: number) => {
    setAmount(num);
  };

  return { amount, append, add, remove, clear, set };
}

export default useKeypadMappedNumber;
