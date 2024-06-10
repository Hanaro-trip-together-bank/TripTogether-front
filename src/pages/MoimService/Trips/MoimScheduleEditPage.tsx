/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
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
import { TripPlaceResDto } from "../../../types/tripPlace/TripPlaceResponseDto";
import { TripPlaceUpdateReqDTO } from "../../../types/tripPlace/TripPlaceRequestDto";
import { useAuth } from "../../../contexts/useAuth";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { TripPlaceUpdatePutURL } from "../../../utils/urlFactory";
import Loading from "../../../components/common/Modals/Loading";
import CommonResDto from "../../../types/CommonResDto";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import SelectPlacePage from "../../SelectPlacePage";
import { PlaceResDto } from "../../../types/Place";
import { CityResDto } from "../../../types/City";
import { ExchangeRate } from "../../../types/ExchangeRate";
import { useExchangeRate } from "../../../contexts/useExchangeRate";
import FXDictionary from "../../../utils/FXDictionary";

interface MoimScheduleEditPageProps {
  schedule: TripPlaceResDto;
  onDone: () => void;
  cities: CityResDto[];
  countryNameEn: string;
}

function MoimScheduleEditPage({
  cities,
  schedule,
  countryNameEn,
  onDone,
}: MoimScheduleEditPageProps) {
  const { exchangeRate } = useExchangeRate();
  const FX: ExchangeRate = {
    ...exchangeRate?.data.exchangeRates.find(
      (er) => er.curCode == FXDictionary[countryNameEn] ?? ""
    ),
  };
  const { member } = useAuth();
  const { back } = useNavigation();
  const [isAmountFocused, toggleIsAmountFocused] = useToggle(); // 금액 포커스하면서 숫자패드 열기
  const { amount, append, remove, add, clear } = useKeypadMappedNumber(
    schedule.placeAmount
  ); // 금액 관련
  const [memo, setMemo] = useState<string>(schedule.placeMemo); // 메모
  const [isPlace, toggleIsPlace] = useToggle(schedule.place != undefined);
  const [place, setPlace] = useState<PlaceResDto | null>(schedule.place);
  const [showEdit, toggleShowEdit] = useToggle();
  const [showEdited, toggleShowEdited] = useToggle();

  const scheduleDraft: TripPlaceUpdateReqDTO = {
    placeIdx: isPlace ? place?.placeIdx ?? 0 : 0,
    placeAmount: amount,
    placeMemo: memo,
    memberIdx: member.memberIdx,
  };
  const { isLoading, trigger } = useFetchTrigger<
    TripPlaceUpdateReqDTO,
    CommonResDto
  >(TripPlaceUpdatePutURL(schedule.tripPlaceIdx), "PUT");

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
              <NavigationLink
                to={{
                  page: <SelectPlacePage cities={cities} onDone={setPlace} />,
                }}
              >
                <HStack className="h-full bg-white border border-gray-300 p-2 rounded-md items-center gap-2">
                  {place ? (
                    <>
                      <img
                        className="w-16 h-16 rounded-lg"
                        src={place.placeImg}
                        alt={place.placeNameEng}
                      />
                      <span className="font-bold text-start">
                        {place.placeNameKo === ""
                          ? place.placeNameEng
                          : place.placeNameKo}
                      </span>
                    </>
                  ) : (
                    <span>장소를 선택해 주세요.</span>
                  )}
                </HStack>
              </NavigationLink>
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
              value={memo}
            />
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
              {FX && (
                <span>
                  {`${(+(amount / +FX.curRate).toFixed()).toLocaleString()} ${FX.curName}(${FX.curCode})`}
                  <br />
                  {exchangeRate?.data.exchangeRateTime} 기준
                </span>
              )}
            </span>
          </VStack>
          <Spacer />

          <HStack>
            <Button gray className="!w-full" roundedFull onClick={back}>
              취소
            </Button>
            <Button className="!w-full" roundedFull onClick={toggleShowEdit}>
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
      {/* 수정 확인 시트 */}
      <Modal xButton backDrop show={showEdit} onClose={toggleShowEdit}>
        <VStack className="w-72 items-center text-center gap-8">
          <span>수정 사항을 저장할까요?</span>
          <HStack className="w-full">
            <Button gray roundedFull onClick={toggleShowEdit}>
              취소
            </Button>
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                toggleShowEdit();
                trigger(scheduleDraft);
                toggleShowEdited();
              }}
            >
              저장
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 수정 완료 시트 */}
      <Modal show={showEdited} onClose={() => {}}>
        <VStack className="w-72 items-center gap-8">
          <span>여행 계획을 수정했습니다.</span>
          <HStack className="w-full">
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                back();
                onDone();
              }}
            >
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
      <Loading show={isLoading} label="수정사항을 저장하는 중 ..." />
    </>
  );
}

export default MoimScheduleEditPage;
