import { useEffect, useState } from "react";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import { useNavigation } from "../../../contexts/useNavigation";
import Keypad from "../../../components/common/Modals/Keypad";
import Modal from "../../../components/common/Modals/Modal";
import Button from "../../../components/common/Button";
import Arrow from "../../../components/common/Arrow";
import { Swiper, SwiperSlide } from "swiper/react";
import useToggle from "../../../hooks/useToggle";
import "swiper/css";
import {
  DuesDeleteRuleURL,
  DuesGetRuleURL,
  DuesSetRuleURL,
} from "../../../utils/urlFactory.ts";
import {
  DueRuleResDto,
  DueRuleSetReqDto,
  DueRuleSetResDto,
} from "../../../types/due/Due";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger.ts";
import { useFetch } from "../../../hooks/useFetch.ts";

interface MoimDuesSetPageProps {
  teamIdx: number;
  accIdx: number;
  onDone: () => void;
}

function MoimDuesSetPage({ teamIdx, onDone }: MoimDuesSetPageProps) {
  const { back, path } = useNavigation();
  console.log(path);
  const [day, setDay] = useState<number>(1);
  const [newDay, setNewDay] = useState<number>(1);
  const { amount, add, append, remove, clear } = useKeypadMappedNumber();
  const [showKeypad, toggleShowKeypad] = useToggle();
  const [showDelete, toggleShowDelete] = useToggle(); //삭제할까요?
  const [showDeleted, toggleShowDeleted] = useToggle(); //삭제했어요
  const [showDaySetter, toggleShowDaySetter] = useToggle();

  const duesGetRuleFetcher = useFetch<null, DueRuleResDto>(
    DuesGetRuleURL(teamIdx),
    "GET"
  );

  useEffect(() => {
    console.log(duesGetRuleFetcher.data == null);
    if (duesGetRuleFetcher.data?.data?.duesDate)
      setDay(duesGetRuleFetcher.data.data.duesDate);

    if (duesGetRuleFetcher.data?.data?.duesAmount) {
      add(duesGetRuleFetcher.data.data.duesAmount);
    }
  }, [duesGetRuleFetcher.data]);

  const duesSetRuleFetcher = useFetchTrigger<
    DueRuleSetReqDto,
    DueRuleSetResDto
  >(DuesSetRuleURL(), "POST");

  const duesDeleteRuleFetcher = useFetchTrigger<null, DueRuleSetResDto>(
    DuesDeleteRuleURL(teamIdx),
    "DELETE"
  );

  const onSaveBtn = () => {
    duesSetRuleFetcher.trigger({
      teamIdx: teamIdx,
      duesDate: day,
      duesAmount: amount,
    });
  };

  useEffect(() => {
    if (duesSetRuleFetcher.data?.code && duesSetRuleFetcher.data.code == 200) {
      onDone();
      back();
    }
  }, [duesSetRuleFetcher.data]);

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

          <Button className="w-full" onClick={onSaveBtn} disabled={amount == 0}>
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
                duesDeleteRuleFetcher.trigger(null);
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
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                onDone();
                back();
              }}
            >
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimDuesSetPage;
