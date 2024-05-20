import { HTMLAttributes, useEffect, useState } from "react";
import StatusBar from "../TopBars/StatusBar";
import cn from "../../../utils/cn";
import XButton from "../Xbutton";
import { VStack } from "../Stack";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  xButton?: boolean;
  dark?: boolean;
  modalType?: "modal" | "sheet";
  backDrop?: boolean;
  onClose: () => void;
}

function Modal({
  show,
  xButton = false,
  dark = false,
  modalType = "modal",
  backDrop = false,
  onClose,
  children,
  className = "",
  ...props
}: ModalProps) {
  // 내용 보여줄지
  const [showContent, setShowContent] = useState<boolean>(false);

  // 기본 백드롭 클래스네임
  const baseBackDropClassName = "transition-opacity";
  // 백드롭 투명도 처리
  const backDropOpacityClassName = show ? "opacity-100" : "opacity-0";
  // 백드롭 클래스네임
  const processedBackDropClassName = cn(
    baseBackDropClassName,
    backDropOpacityClassName
  );

  // 애니메이션 고려해서 모달/시트 열 때는 바로 컨텐츠 보여주지만
  // 닫을 때는 0.2초 지연 후 가림
  useEffect(() => {
    let hideContent: string | number | NodeJS.Timeout | undefined;
    if (show) setShowContent(true);
    else hideContent = setTimeout(() => setShowContent(false), 200);
    return () => {
      clearTimeout(hideContent);
    };
  }, [show]);

  return (
    <div className={cn("absolute w-full", show ? "h-full" : "h-0 delay-100")}>
      {/* 백드롭(어두운 오버레이) + 상단 스테이터스바 흰색버전 */}
      <div className={processedBackDropClassName}>
        <div className="absolute w-full z-40">
          <StatusBar white />
        </div>
        <div
          className="absolute w-full h-full bg-black opacity-50 z-30"
          onClick={() => {
            if (backDrop) onClose();
          }}
        />
        <div className="absolute w-full h-full flex flex-col items-center justify-center">
          {
            // 모달 또는 시트 렌더링
            {
              // 모달
              modal: (
                <div
                  className={cn(
                    "absolute p-8 shadowed rounded-3xl w-fit h-fit z-40 transition-all delay-100",
                    show ? "opacity-100" : "translate-y-10 opacity-0",
                    dark ? "bg-secondary" : "bg-white",
                    className
                  )}
                  {...props}
                >
                  {xButton && (
                    <XButton
                      className="absolute -translate-x-4 -translate-y-4"
                      onClick={onClose}
                      white={dark}
                    />
                  )}
                  {showContent && children}
                </div>
              ),
              // 시트
              sheet: (
                <VStack
                  className={cn(
                    "absolute bottom-0 w-full h-fit p-6 rounded-t-3xl z-40 transition-all delay-100",
                    show ? "opacity-100" : "translate-y-20 opacity-0",
                    dark ? "bg-secondary" : "bg-white",
                    className
                  )}
                  {...props}
                >
                  {xButton && (
                    <XButton
                      className="absolute -translate-x-4 -translate-y-4"
                      onClick={onClose}
                      white={dark}
                    />
                  )}
                  {showContent && children}
                </VStack>
              ),
            }[modalType]
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
