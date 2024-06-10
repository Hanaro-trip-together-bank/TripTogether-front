import { ChangeEvent, useState } from "react";
import Keypad from "../components/common/Modals/Keypad";
import Modal from "../components/common/Modals/Modal";
import { HStack, Spacer, VStack } from "../components/common/Stack";
import TextArea from "../components/common/TextArea";
import useKeypadMappedNumber from "../hooks/useKeypadMappedNumber";
import useToggle from "../hooks/useToggle";
import NavigationLink from "../components/common/Navigation/NavigationLink";
import Calendar from "../components/common/Calendar";
import formatDateToYYYYMMDD from "../utils/formatDateToYYYYMMDD";
import SelectCountryPage from "./SelectCountryPage";
import NavigationBar from "../components/common/TopBars/NavigationBar";
import TripImage from "../components/trip/TripImg";
import cn from "../utils/cn";
import { Trip } from "../types/trip/Trip";
import Button from "../components/common/Button";
import { useNavigation } from "../contexts/useNavigation";

// {
//   teamIdx: 1,
//   teamName: "hanaro2team",
//   tripName: "여행1",
//   tripContent: "여행 떠나보자",
//   tripGoalAmount: 10000000,
//   tripDay: 10,
//   tripImg: 0,
//   tripStartDay: "2024-01-01",
//   createdBy: 1,
//   cities: [85, 86, 87],
// };
interface CreateTripPageProps {
  memberIdx: number;
  teamIdx: number;
  teamName: string;
}
export default function CreateTripPage({
  memberIdx,
  teamIdx,
  teamName,
}: CreateTripPageProps) {
  const { navigateTo } = useNavigation();
  // const tripNameInputRef = useRef<HTMLInputElement | null>(null);
  // const tripContentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [tripName, setTripName] = useState("");
  const [tripContent, setTripContent] = useState("");

  const [tripDay, setTripDay] = useState(4);
  const [tripImg, setTripImg] = useState(0);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  // const { trip, addinfo } = useTrip();
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
  const onChangeTripName = (e: ChangeEvent<HTMLInputElement>) => {
    setTripName(e.target.value);
  };
  const onChangeTripContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTripContent(e.target.value);
  };

  const info: Trip = {
    teamIdx: teamIdx,
    teamName: teamName,
    tripName: tripName || "여행 1",
    tripContent: tripContent,
    tripGoalAmount: amount,
    tripDay,
    tripImg,
    tripStartDay: formatDateToYYYYMMDD(startDate),
    createdBy: memberIdx,
    cities: [],
  };

  // const addTripinfo = () => {
  //   addinfo({
  //     tripName: tripNameInputRef.current?.value || "여행 1",
  //     tripContent: tripContentInputRef.current?.value,
  //     tripGoalAmount: amount,
  //     tripDay,
  //     tripImg,
  //     tripStartDay: formatDateToYYYYMMDD(startDate),
  //     createdBy: memberIdx,
  //   });
  // };

  return (
    <>
      <VStack
        className={cn(
          "bg-gray-50 gap-3 h-full transition-all",
          showKeypad ? "-translate-y-36" : ""
        )}
      >
        <NavigationBar title="여행 계획하기 📆" />
        <VStack className="p-6 bg-gray-50 gap-3 h-full overflow-y-auto">
          <label htmlFor={"tripTitle"} className="font-bold">
            여행 이름
          </label>
          <input
            id={"tripTitle"}
            value={tripName}
            // ref={tripNameInputRef}
            onChange={onChangeTripName}
            type="text"
            className="border border-gray-300 p-2 transition-all rounded-md text-xl font-bold"
            placeholder="여행 1"
          />

          <TextArea
            label={"상세정보"}
            value={tripContent}
            // ref={tripContentInputRef}
            onChange={onChangeTripContent}
            border
            placeholder="상세 내용을 적어주세요."
          />

          <HStack className="my-3 mx-2 gap-3 !min-h-fit !pb-2 overflow-x-scroll">
            {Array.from({ length: 9 }, (_, i) => i).map((i) => (
              <button
                key={i}
                // className="text-nowrap snap-start !min-h-7"
                className={`border-4 p-1 box-content transition-all text-nowrap text-primary  !min-w-12 !min-h-12 rounded-xl shadowed ${i === tripImg ? "translate-y-0.5 border-primary bg-blue-200" : "border-transparent"}`}
                onClick={() => setTripImg(i)}
              >
                <TripImage type={i} />
              </button>
            ))}
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
                <span className="text-primary">
                  {amount.toLocaleString()}원
                </span>
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

          <Spacer />
          <div className="w-full">
            <Button
              className="text-white text-nowrap transition-all py-2 px-8 w-full h-fit bg-primary rounded-md"
              onClick={() =>
                navigateTo({ page: <SelectCountryPage info={info} /> })
              }
              disabled={tripName == ""}
            >
              다음
            </Button>
          </div>
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
    </>
  );
}
