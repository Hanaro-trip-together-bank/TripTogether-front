const getPeriod = (startDate: string, days: number): string => {
  const start = new Date(startDate);
  const end = new Date(start);

  // days-1 를 더하여 마지막 날을 계산
  end.setDate(start.getDate() + days - 1);

  // yyyy-mm-dd 형식으로 날짜를 포맷팅하는 함수
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return `${formatDate(start)} ~ ${formatDate(end)}`;
};

export default getPeriod;
