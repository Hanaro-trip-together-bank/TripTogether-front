const addDaysAndFormat = (date: Date, days: number): string => {
  // 날짜 더하기
  const resultDate = new Date(date);
  resultDate.setDate(resultDate.getDate() + days);

  // 요일 배열 (한글)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 결과 날짜의 월, 일, 요일 가져오기
  const month = String(resultDate.getMonth() + 1).padStart(2, "0");
  const day = String(resultDate.getDate()).padStart(2, "0");
  const weekday = weekdays[resultDate.getDay()];

  // MM.DD(요일) 형식으로 반환
  return `${month}.${day}(${weekday})`;
};

export default addDaysAndFormat;
