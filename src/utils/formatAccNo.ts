function formatAccNo(input: string): string {
  if (input.length !== 14) {
    throw new Error("Input string must be exactly 14 characters long");
  }

  const part1 = input.slice(0, 3);
  const part2 = input.slice(3, 9);
  const part3 = input.slice(9, 14);

  return `${part1}-${part2}-${part3}`;
}

export default formatAccNo;
