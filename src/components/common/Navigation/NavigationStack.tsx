import { useEffect, useLayoutEffect, useState } from "react";
import cn from "../../../utils/cn";
import { useNavigation } from "../../../contexts/useNavigation";
import StatusBar from "../TopBars/StatusBar";

function NavigationStack() {
  const { path, prevPage } = useNavigation();
  const [pageCount, setPageCount] = useState<number>(path.length);

  // path 스택이 바뀔 때마다 이전 스택 깊이와 비교하고 늘어났으면 푸시, 줄었으면 팝 애니메이션 실행
  // 두 개 이상 차이나면 애니메이션 안 함
  // useLayoutEffect 으로 화면 렌더링 되기 전 작동시킴
  useLayoutEffect(() => {
    if (path.length > pageCount) startPushAnimation();
    setPageCount(path.length);
  }, [pageCount, path]);

  useLayoutEffect(() => {
    if (prevPage) startPopAnimation();
  }, [prevPage]);

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
    <div className="relative w-full h-full bg-white">
      <StatusBar className="absolute bg-white" />
      {path.map((page, index) => (
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
          <div className="mt-12 bg-white w-full h-full overflow-scroll">
            {page}
          </div>
        </div>
      ))}
      {prevPage && (
        <div
          key={`navigationStack#${path.length}`}
          className={cn(
            "absolute w-full h-full transition-all ease-in",
            isPopAnimationStarted ? "translate-x-iPhone" : ""
          )}
        >
          <div className="mt-12 bg-white w-full h-full overflow-scroll">
            {prevPage}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationStack;
