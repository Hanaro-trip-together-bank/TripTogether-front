import { useEffect, useLayoutEffect, useState } from "react";
import cn from "../../../utils/cn";
import { useNavigation } from "../../../contexts/useNavigation";
import StatusBar from "../TopBars/StatusBar";
import { CommunicationBlockProvider } from "../../../contexts/useCommunicationBlock";

function NavigationStack() {
  const { path, prevRoute } = useNavigation();
  const [pageCount, setPageCount] = useState<number>(path.length);

  // path 스택이 바뀔 때마다 이전 스택 깊이와 비교하고 늘어났으면 푸시, 줄었으면 팝 애니메이션 실행
  // 두 개 이상 차이나면 애니메이션 안 함
  // useLayoutEffect 으로 화면 렌더링 되기 전 작동시킴
  useLayoutEffect(() => {
    if (path.length > pageCount) startPushAnimation();
    setPageCount(path.length);
  }, [pageCount, path]);

  useLayoutEffect(() => {
    if (prevRoute) startPopAnimation();
  }, [prevRoute]);

  // 애니메이션 시작 여부 false로 만드는 순간 useEffect를 통해 true로 바뀌며 바로 애니메이션 진행될 수 있도록 함
  const [isPushAnimationStarted, setIsPushAnimationStarted] =
    useState<boolean>(false);
  useEffect(() => setIsPushAnimationStarted(true), [isPushAnimationStarted]);
  const startPushAnimation = () => {
    setIsPushAnimationStarted(false);
  };
  const [isPopAnimationStarted, setIsPopAnimationStarted] =
    useState<boolean>(false);
  useEffect(() => setIsPopAnimationStarted(true), [isPopAnimationStarted]);
  const startPopAnimation = () => {
    setIsPopAnimationStarted(false);
  };

  return (
    <div
      className={cn(
        "relative w-full h-full",
        path[path.length - 1]?.backgroundColor ?? "bg-white"
      )}
    >
      <StatusBar
        className={"absolute transition-colors"}
        white={path[path.length - 1]?.backgroundColor == "bg-secondary"}
      />
      {path.map((route, index) => (
        <div
          // 키가 일정하게 유지되어야 리렌더되어도 내용/스크롤 초기화 안 됨 => 인덱스 사용
          // eslint-disable-next-line react/no-array-index-key
          key={`navigationStack#${index}`}
          className={cn(
            "absolute w-full h-full transition-all ease-in",
            index < path.length - 2 ? "hidden" : "",
            index == path.length - 1 ? "z-10 opacity-100" : "z-0 opacity-80",
            path.length > 1 &&
              index == path.length - 1 &&
              !isPushAnimationStarted
              ? "translate-x-iPhone"
              : ""
          )}
        >
          <div
            className={cn(
              "mt-12 pb-12 w-full h-full",
              route.backgroundColor ?? "bg-white"
            )}
          >
            {route.page}
          </div>
        </div>
      ))}
      <CommunicationBlockProvider>
        {prevRoute && (
          <div
            key={`navigationStack#${path.length}`}
            className={cn(
              "absolute w-full h-full transition-all ease-in",
              isPopAnimationStarted ? "translate-x-iPhone" : ""
            )}
          >
            <div
              className={cn(
                "mt-12 pb-12 w-full h-full",
                prevRoute.backgroundColor ?? "bg-white"
              )}
            >
              {prevRoute.page}
            </div>
          </div>
        )}
      </CommunicationBlockProvider>
    </div>
  );
}

export default NavigationStack;
