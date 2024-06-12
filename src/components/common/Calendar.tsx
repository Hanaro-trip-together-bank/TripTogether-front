import { useState } from "react";
import cn from "../../utils/cn";
import { HStack } from "./Stack";

const dayOfWeek = [" 일", " 월", " 화", " 수", " 목", " 금", " 토"];

const getMonthDates = (currentDate: Date) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const lastDay = new Date(year, month + 1, 0);

  const dates = [];
  for (let day = 1; day <= lastDay.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }
  return dates;
};

const today = new Date();
const todayYear = today.getFullYear();
const todayMonth = today.getMonth();
const todayDate = today.getDate();

type CalendarProps = {
  tripDay: number;
  startDate: Date | undefined;
  onClickStartDate: (date: Date) => void;
};

export default function Calendar(props: CalendarProps) {
  const { tripDay, startDate, onClickStartDate } = props;
  const [renderMonth, setRenderMonth] = useState<Date>(() => new Date(today));
  const year = renderMonth.getFullYear();
  const month = renderMonth.getMonth();
  const date = renderMonth.getDate();

  const selectedLastDate = (date: Date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth();

    return new Date(selectedYear, selectedMonth, date.getDate() + tripDay - 1);
  };

  const plusMonth = () => {
    setRenderMonth(new Date(year, month + 1, date));
  };
  const minusMonth = () => {
    setRenderMonth(new Date(year, month - 1, date));
  };

  const dates = getMonthDates(renderMonth);

  return (
    <>
      <div>
        <HStack className="flex justify-center gap-2">
          <button onClick={minusMonth}>⬅️</button>
          <div className="text-center text-lg font-bold">{`${year}년 ${month + 1}월`}</div>
          <button onClick={plusMonth}>➡️</button>
        </HStack>

        <div className="border border-gray-500 rounded-lg grid grid-cols-7 gap-2 text-center font-bold">
          {dayOfWeek.map((dayName) => (
            <span key={dayName}>{dayName}</span>
          ))}
          {Array(dates[0].getDay())
            .fill(null)
            .map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`empty-${idx}`}
                className="p-2"
              ></div>
            ))}
          {dates.map((date) => (
            <button
              key={date.getDate()}
              disabled={date < new Date(todayYear, todayMonth, todayDate)}
              onClick={() => onClickStartDate(date)}
              className={cn(
                "p-2",
                date.getDay() === 0 || date.getDay() === 6
                  ? "text-red-500"
                  : "",
                date < new Date(todayYear, todayMonth, todayDate)
                  ? "!text-gray-200"
                  : "",
                date.toDateString() === today.toDateString()
                  ? "text-blue-500"
                  : "",
                startDate &&
                  startDate <= date &&
                  date <= selectedLastDate(startDate)
                  ? "bg-blue-500 !text-white"
                  : ""
              )}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
