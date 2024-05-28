import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/common/Modals/Modal";
import Keypad from "../../../components/common/Modals/Keypad";
import Button from "../../../components/common/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useNavigation } from "../../../contexts/useNavigation";

interface MoimDuesSetPageProps {}

function MoimDuesSetPage({}: MoimDuesSetPageProps) {
  const { back } = useNavigation();
  const [day, setDay] = useState<number>(1);
  const [newDay, setNewDay] = useState<number>(1);
  const { amount, add, append, remove, clear } = useKeypadMappedNumber();
  const [showKeypad, toggleShowKeypad] = useToggle();
  const [showDelete, toggleShowDelete] = useToggle(); //삭제할까요?
  const [showDeleted, toggleShowDeleted] = useToggle(); //삭제했어요
  const [showDaySetter, toggleShowDaySetter] = useToggle();

  return (
    <>
      <VStack className="min-h-full h-full bg-white pb-8">
        <NavigationBar title={"회비등록"} />
        <VStack className="h-full py-4 px-6">
          <span className="text-xl font-bold pb-8"> 얼마씩 모을까요? </span>
          <VStack className="font-bold gap-4">
            <HStack>
              <span>매월</span>
              <button
                className="flex flex-row gap-1 border-b border-black"
                onClick={toggleShowDaySetter}
              >
                <span className="text-primary"> {day}일</span>
                <Arrow direction="down" />
              </button>
            </HStack>
            <HStack>
              <button
                className="border-b border-black"
                onClick={toggleShowKeypad}
              >
                <span className="text-primary">
                  {amount.toLocaleString()}원
                </span>
              </button>
              <span>씩 모으기</span>
            </HStack>
            <button
              className="bg-gray-100 text-gray-500 rounded-md p-1 px-2 w-fit"
              onClick={toggleShowDelete}
            >
              회비 삭제하기
            </button>
          </VStack>
          <Spacer />
          <Button className="w-full" onClick={back}>
            저장
          </Button>
        </VStack>
      </VStack>
      {/* 키패드 시트 */}
      <Modal
        xButton
        hideBackDrop
        modalType="sheet"
        backDrop
        dark
        show={showKeypad}
        onClose={toggleShowKeypad}
      >
        <Keypad
          onAdd={add}
          onClear={clear}
          onAppend={append}
          onRemove={remove}
          onDone={toggleShowKeypad}
        />
      </Modal>
      {/* 날짜 설정 시트 */}
      <Modal
        modalType="sheet"
        backDrop
        show={showDaySetter}
        onClose={toggleShowDaySetter}
      >
        <VStack className="w-full items-center">
          <span>회비 등록일 선택</span>
          <HStack className="w-full p-4 gap-4 py-8">
            <div className="w-full h-16 bg-gray-100 text-xl text-center p-4 rounded-md">
              매월
            </div>
            <div className="relative w-full h-16 bg-gray-100 p-4 rounded-md">
              <div className="absolute pointer-events-none w-full h-1/2 bottom-0 left-0 z-20 bg-gradient-to-b from-transparent to-gray-100 rounded-md" />
              <Swiper
                autoHeight
                direction="vertical"
                slidesPerView={1}
                spaceBetween={-20}
                initialSlide={day - 1}
                onSlideChange={(swiper) => {
                  setNewDay(swiper.realIndex + 1);
                }}
              >
                {Array.from({ length: 28 }, (_, i) => i + 1).map((i) => (
                  <SwiperSlide className="!h-12 text-center text-xl" key={i}>
                    <span>{i}일</span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </HStack>
          <HStack className="w-full">
            <Button gray roundedFull onClick={toggleShowDaySetter}>
              취소
            </Button>
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                setDay(newDay);
                toggleShowDaySetter();
              }}
            >
              저장
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 삭제 확인 시트 */}
      <Modal xButton backDrop show={showDelete} onClose={toggleShowDelete}>
        <VStack className="w-72 items-center text-center gap-8">
          <span>
            회비를 삭제하면, 더 이상 금액으로
            <br />
            회비를 검증할 수 없어요.
            <br />
            그래도 삭제할까요?
          </span>
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
          <span>회비를 삭제했습니다.</span>
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

export default MoimDuesSetPage;
