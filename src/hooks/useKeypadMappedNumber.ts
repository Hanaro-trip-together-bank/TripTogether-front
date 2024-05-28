import { useState } from "react";

function useKeypadMappedNumber() {
  const [amount, setAmount] = useState(0);

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

  return { amount, append, add, remove, clear };
}

export default useKeypadMappedNumber;
