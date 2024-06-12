export const printMoney = (money: number) => {
  const units = ["", "만", "억", "조", "경", "해"];
  let strNumber = money.toString();
  let result = "";
  let unitIndex = 0;

  while (strNumber.length > 4) {
    const chunk = strNumber.slice(-4);
    strNumber = strNumber.slice(0, -4);
    if (+chunk > 0)
      result = (+chunk).toLocaleString() + units[unitIndex] + (result ?? "");
    unitIndex++;
  }
  result = (+strNumber).toLocaleString() + units[unitIndex] + (result ?? "");
  return result;
};
