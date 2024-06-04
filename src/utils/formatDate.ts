const formatDate = (date: Date): string => {
  // 요일 배열 (한글)
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

  // 결과 날짜의 월, 일, 요일 가져오기
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = weekdays[date.getDay()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // MM.DD(요일) 형식으로 반환
  return `${month}.${day}(${weekday}) ${hours}:${minutes}`;
};

export default formatDate;
