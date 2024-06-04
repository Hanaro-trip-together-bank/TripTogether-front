import { useRef, useState } from "react";
import Button from "../components/common/Button";
import Keypad from "../components/common/Modals/Keypad";
import Modal from "../components/common/Modals/Modal";
import { HStack, Spacer, VStack } from "../components/common/Stack";
import TextArea from "../components/common/TextArea";
import useKeypadMappedNumber from "../hooks/useKeypadMappedNumber";
import useToggle from "../hooks/useToggle";
import NavigationLink from "../components/common/Navigation/NavigationLink";
import SelectCityPage from "./SelectCountryPage";
import { CountryCartProvider } from "../contexts/City-Cart-Context";
import Calendar from "../components/common/Calendar";
import { useTrip } from "../contexts/Trip-Context";
import formatDateToYYYYMMDD from "../utils/formatDateToYYYYMMDD";
import SelectCountryPage from "./SelectCountryPage";
import NavigationBar from "../components/common/TopBars/NavigationBar";

// {
//   “team_idx”:1,
//   “country_idx”: 1,
//   ”trip_name”: “hanaro”,
//   “trip_content”: “일본가자”, “trip_goal_amount”: 10000000,
//   “trip_day”: 20,
//   “trip_start_day”: “2024-07-12”
//   }

export default function CreateTripPage() {
  const tripNameInputRef = useRef<HTMLInputElement | null>(null);
  const tripContentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [tripDay, setTripDay] = useState(4);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const { trip, addBasicInfo } = useTrip();
  const [showCalendar, toggleShowCalendar] = useToggle();
  const [showKeypad, toggleShowKeypad] = useToggle();
  const { amount, add, append, remove, clear } = useKeypadMappedNumber();

  const plusDay = () => {
    setTripDay((prev) => prev + 1);
  };
  const minusDay = () => {
    if (tripDay === 1) {
      return;
    }
    setTripDay((prev) => prev - 1);
  };
  const onClickStartDate = (date: Date) => {
    setStartDate(date);
  };

  const addTripBasicInfo = () => {
    addBasicInfo({
      tripName: tripNameInputRef.current?.value || "여행 1",
      tripContent: tripContentInputRef.current?.value,
      tripGoalAmount: amount,
      tripDay,
      tripStartDay: formatDateToYYYYMMDD(startDate),
    });
  };

  return (
    <VStack className="bg-gray-50 gap-3 h-full">
      <NavigationBar title="여행 계획하기 📆" />
      <VStack className="p-6 bg-gray-50 gap-3 h-full overflow-y-scroll">
        <label htmlFor={"tripTitle"} className="font-bold">
          여행 이름
        </label>
        <input
          id={"tripTitle"}
          ref={tripNameInputRef}
          type="text"
          className="border border-gray-300 p-2 transition-all rounded-md text-xl font-bold"
          placeholder="여행 1"
        />

        <TextArea
          label={"상세정보"}
          ref={tripContentInputRef}
          border
          placeholder="상세 내용을 적어주세요."
        />

        <HStack className="gap-3">
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
          <button className="w-16 h-16 rounded-xl shadowed"> </button>
        </HStack>

        <div>
          <label htmlFor="goalAmount" className="font-bold">
            목표금액
          </label>
          <HStack>
            <button
              id="goalAmount"
              className="border-b border-black"
              onClick={toggleShowKeypad}
            >
              <span className="text-primary">{amount.toLocaleString()}원</span>
            </button>
            <span>모으기</span>
          </HStack>
        </div>

        <HStack className="gap-3 items-center">
          <button
            className="border border-gray-400 h-10 w-10 rounded-md text-xl"
            onClick={minusDay}
          >
            -
          </button>
          <span className="text-lg">{tripDay}</span>
          <button
            className="border border-gray-400 h-10 w-10 rounded-md text-xl"
            onClick={plusDay}
          >
            +
          </button>
          <span className="text-gray-600 font-light">
            {`${tripDay - 1}박 ${tripDay}일 일정이에요.`}
          </span>
        </HStack>

        <button
          className="text-gray-500 underline mr-auto mt-2"
          onClick={toggleShowCalendar}
        >
          세부일정 선택하기
        </button>

        {showCalendar && (
          <Calendar
            tripDay={tripDay}
            startDate={startDate}
            onClickStartDate={onClickStartDate}
          />
        )}
        {/* <Calendar /> */}
      </VStack>

      <NavigationLink
        className="m-6"
        to={{
          page: <SelectCountryPage />,
        }}
      >
        <Button className="w-full" onClick={addTripBasicInfo}>
          다음
        </Button>
      </NavigationLink>

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
    </VStack>
  );
}
