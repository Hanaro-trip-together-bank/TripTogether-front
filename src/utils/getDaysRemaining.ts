const getDaysRemaining = (targetDate: string): string => {
  const now = new Date();
  const target = new Date(targetDate);

  // 현재 날짜와 목표 날짜의 차이 (밀리초 단위)
  const diffTime = now.getTime() - target.getTime();

  // 차이를 일 단위로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays == 1) return "D-Day";
  return diffDays > 0 ? `D+${diffDays}` : `D${diffDays}`;
};
export default getDaysRemaining;
