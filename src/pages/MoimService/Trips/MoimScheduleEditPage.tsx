import { useEffect, useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import { VStack, HStack, Spacer } from "../../../components/common/Stack";
import TextArea from "../../../components/common/TextArea";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import cn from "../../../utils/cn";
import Modal from "../../../components/common/Modals/Modal";
import Keypad from "../../../components/common/Modals/Keypad";
import { printMoney } from "../../../utils/printMoney";
import useToggle from "../../../hooks/useToggle";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import Toggle from "../../../components/common/Toggle";
import { useNavigation } from "../../../contexts/useNavigation";

interface MoimScheduleEditPageProps {}

function MoimScheduleEditPage({}: MoimScheduleEditPageProps) {
  const { back } = useNavigation();
  const [isAmountFocused, toggleIsAmountFocused] = useToggle(); // 금액 포커스하면서 숫자패드 열기
  const { amount, append, remove, add, clear } = useKeypadMappedNumber(); // 금액 관련
  const [memo, setMemo] = useState<string>(""); // 메모
  const [isPlace, toggleIsPlace] = useToggle();
  const [showDelete, toggleShowDelete] = useToggle();
  const [showDeleted, toggleShowDeleted] = useToggle();

  return (
    <>
      <VStack className="min-h-full h-full pb-8 overflow-hidden">
        <NavigationBar title={"계획 수정"} className="bg-white z-10" />
        <VStack
          className={cn(
            "w-full h-full p-6 gap-4 transition-transform z-0",
            isAmountFocused ? "-translate-y-32" : ""
          )}
        >
          <VStack>
            <HStack>
              <span>장소 지정</span>
              <Toggle selected={isPlace} onClick={toggleIsPlace} />
            </HStack>
          </VStack>
          {isPlace && (
            <VStack className="mb-4">
              <span>장소</span>
              <HStack className="h-full bg-white border border-gray-300 p-2 rounded-md items-center gap-2">
                TODO: 장소 선택 링크 (장소 정보 표시)
              </HStack>
            </VStack>
          )}
          {/* 메모 */}
          <VStack>
            <span>메모</span>
            <TextArea
              border
              placeholder="메모"
              onChange={(e) => {
                setMemo(e.target.value);
              }}
            >
              {memo}
            </TextArea>
          </VStack>
          {/* 예상 비용 */}
          <VStack>
            <span>예상 비용</span>
            <button onClick={toggleIsAmountFocused}>
              <VStack
                className={cn(
                  "items-start bg-white border p-2 rounded-md transition-all box-border",
                  isAmountFocused
                    ? "border-primary border-2 relative z-50"
                    : "border-gray-300"
                )}
              >
                <span className="text-sm text-gray-500"> 예상 비용 </span>
                <HStack className="w-full justify-end">
                  <span>{amount.toLocaleString()}</span>
                  <span>원</span>
                </HStack>
              </VStack>
            </button>
            <span className="w-full text-gray-500 text-end">
              {printMoney(amount)}원
              <br />
              {(30).toLocaleString()}$
            </span>
          </VStack>
          <Spacer />
          <button className="mx-auto p-4" onClick={toggleShowDelete}>
            <span className="text-center text-red-500">계획 삭제하기</span>
          </button>
          <Spacer />
          <HStack>
            <Button gray className="!w-full" roundedFull onClick={() => {}}>
              취소
            </Button>
            <Button className="!w-full" roundedFull onClick={() => {}}>
              저장
            </Button>
          </HStack>
        </VStack>
      </VStack>
      {/* 키패드 시트 */}
      <Modal
        xButton
        modalType="sheet"
        backDrop
        hideBackDrop
        dark
        show={isAmountFocused}
        onClose={toggleIsAmountFocused}
      >
        <Keypad
          onAdd={add}
          onClear={clear}
          onAppend={append}
          onRemove={remove}
          onDone={toggleIsAmountFocused}
        />
      </Modal>
      {/* 삭제 확인 시트 */}
      <Modal xButton backDrop show={showDelete} onClose={toggleShowDelete}>
        <VStack className="w-72 items-center text-center gap-8">
          <span>정말로 여행 계획을 삭제할까요?</span>
          <HStack className="w-full">
            <Button gray roundedFull onClick={toggleShowDelete}>
              아니요
            </Button>
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                toggleShowDelete();
                toggleShowDeleted();
              }}
            >
              예
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 삭제 완료 시트 */}
      <Modal show={showDeleted} onClose={() => {}}>
        <VStack className="w-72 items-center gap-8">
          <span>여행 계획을 삭제했습니다.</span>
          <HStack className="w-full">
            <Button className="flex-grow" roundedFull onClick={back}>
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimScheduleEditPage;
