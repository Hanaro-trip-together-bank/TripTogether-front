import { useNavigation } from "../../../contexts/useNavigation";
import cn from "../../../utils/cn";
import { HStack, Spacer, VStack } from "../Stack";
import Title from "../Title";

interface NavigationBarProps {
  className?: string;
  white?: boolean;
  title: string;
  disableBack?: boolean;
  disableHome?: boolean;
  onBack?: () => void;
  onHome?: () => void;
}

function NavigationBar({
  className = "",
  white = false,
  disableBack = false,
  disableHome = false,
  onBack,
  onHome,
  title,
}: NavigationBarProps) {
  const { back, home } = useNavigation();
  if (!onBack) onBack = back;
  if (!onHome) onHome = home;
  const { path } = useNavigation();
  const color = white ? "white" : "black";
  return (
    <VStack
      className={cn(
        className,
        "sticky w-full h-12 items-center justify-center top-0 z-10",
        white ? "bg-secondary" : ""
      )}
    >
      <div className={cn("absolute", white ? "text-white" : "text-black")}>
        <Title>{title}</Title>
      </div>
      <HStack className="items-center py-2 pl-4 pr-6 font-bold text-lg w-full border-none">
        {/* 뒤로가기 화살표 */}
        {!disableBack && path.length > 1 && (
          <button onClick={onBack}>
            <svg className="w-6 h-6" viewBox="0 0 1024 1024" fill={color}>
              <path d="M652.949333 865.706667c11.690667 11.946667 30.613333 11.946667 42.282667 0a31.146667 31.146667 0 0 0 0-43.306667l-295.765333-302.933333a10.666667 10.666667 0 0 1 0-14.933334l295.765333-302.933333a31.146667 31.146667 0 0 0 0-43.306667 29.397333 29.397333 0 0 0-42.282667 0L328.768 490.346667a31.146667 31.146667 0 0 0 0 43.306666L652.949333 865.706667z" />
            </svg>
          </button>
        )}
        <Spacer />
        {/* 페이지 타이틀 */}
        <Spacer />
        {/* 홈 버튼 */}
        {!disableHome && (
          <button onClick={onHome}>
            <svg className="w-8 h-6" viewBox="0 0 1024 1024" fill={color}>
              <path d="M495.68256 30.53568a28.29824 28.29824 0 0 1 31.94368 0l406.75328 280.29952a61.5936 61.5936 0 0 1 26.8288 50.8416l2.57536 609.11104a28.29824 28.29824 0 0 1-28.29824 28.29824H89.73824A28.29824 28.29824 0 0 1 61.44 970.78784l1.46944-609.11104a61.5936 61.5936 0 0 1 26.8288-50.8416L495.68256 30.53568zM512 88.18176L120.2176 357.5552a4.992 4.992 0 0 0-2.18112 4.1216v580.8128h792.3712V361.6768a4.992 4.992 0 0 0-2.17088-4.1216L512 88.18176zM332.12416 811.008a29.1328 29.1328 0 1 1 0-58.2656h366.22336a29.1328 29.1328 0 1 1 0 58.2656H332.12416z" />
            </svg>
          </button>
        )}
        {/* 햄버거 메뉴 버튼 */}
        <svg className="w-6 h-6" fill={color}>
          <g xmlns="http://www.w3.org/2000/svg">
            <rect height="1.5" width="24" x="2" y="4" />
            <rect height="1.5" width="24" x="2" y="12" />
            <rect height="1.5" width="24" x="2" y="20" />
          </g>
        </svg>
      </HStack>
    </VStack>
  );
}
export default NavigationBar;
