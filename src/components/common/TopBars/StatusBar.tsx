import { useEffect, useState } from "react";
import { HStack, Spacer } from "../Stack";
import currentTime from "../../../utils/currentTime";
import cn from "../../../utils/cn";

interface StatusBarProps {
  white?: boolean;
  className?: string;
}

function StatusBar({ className = "", white = false }: StatusBarProps) {
  const [time, setTime] = useState<string>(currentTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(currentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const color = white ? "white" : "black";
  return (
    <HStack
      className={cn(
        "items-center py-2 px-8 font-bold text-lg w-full",
        white ? "text-white" : "text-black",
        className
      )}
    >
      {/* 시계 */}
      <span className={white ? "z-50" : ""}>{time}</span>
      <Spacer />
      {/* 와이파이 아이콘 */}
      <svg
        className={cn("w-6 h-6", white ? "z-50" : "")}
        viewBox="0 0 1024 1024"
        fill={color}
      >
        <path d="M512 192c-163 0-326 67.2-443 176.6-6.6 6-6.8 16.2-0.6 22.8l53.4 55.8c6.2 6.6 16.6 6.8 23.2 0.6 46.6-43.2 99.8-77.6 158.6-102 66-27.6 136.2-41.4 208.6-41.4s142.6 14 208.6 41.4c58.8 24.6 112 58.8 158.6 102 6.6 6.2 17 6 23.2-0.6l53.4-55.8c6.2-6.4 6-16.6-0.6-22.8C838 259.2 675 192 512 192z" />
        <path d="M226.4 555l57.2 56.6c6.2 6 16 6.4 22.4 0.6 56.6-50.2 129.2-77.8 205.8-77.8s149.2 27.4 205.8 77.8c6.4 5.8 16.2 5.4 22.4-0.6l57.2-56.6c6.6-6.6 6.4-17.2-0.6-23.4-75-67.8-175.2-109.2-285-109.2s-210 41.4-285 109.2c-6.6 6.2-6.8 16.8-0.2 23.4zM512 648.4c-46.8 0-89.2 19.6-118.8 51-6 6.4-5.8 16.2 0.4 22.4l106.8 105.4c6.4 6.4 16.8 6.4 23.2 0l106.8-105.4c6.2-6.2 6.4-16 0.4-22.4-29.6-31.2-72-51-118.8-51z" />
      </svg>
      {/* 배터리 아이콘 */}
      <svg
        className={cn("w-8 h-8", white ? "z-50" : "")}
        viewBox="0 0 1024 1024"
        fill={color}
      >
        <path d="M792 288H128c-52.8 0-96 43.2-96 96v256c0 52.8 43.2 96 96 96h664c52.8 0 96-43.2 96-96V384c0-52.8-43.2-96-96-96z m40 352c0 22-18 40-40 40H128c-22 0-40-18-40-40V384c0-22 18-40 40-40h664c22 0 40 18 40 40v256z m96-230.8v205.6c32 0 64-55.4 64-102.8s-32-102.8-64-102.8z" />
        <path d="M768 384H152c-13.2 0-24 10.8-24 24v208c0 13.2 10.8 24 24 24h616c13.2 0 24-10.8 24-24V408c0-13.2-10.8-24-24-24z" />
      </svg>
    </HStack>
  );
}
export default StatusBar;
