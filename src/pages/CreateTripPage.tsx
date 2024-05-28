import { HStack, VStack } from "../components/common/Stack";
import TextArea from "../components/common/TextArea";

// {
//   “team_idx”:1,
//   “country_idx”: 1,
//   ”trip_name”: “hanaro”,
//   “trip_content”: “일본가자”, “trip_goal_amount”: 10000000,
//   “trip_day”: 20,
//   “trip_start_day”: “2024-07-12”
//   }

export default function CreateTripPage() {
  return (
    <VStack className="p-6 bg-gray-50 gap-3">
      <label htmlFor={"tripTitle"} className="font-bold">
        여행 이름
      </label>
      <input
        id={"tripTitle"}
        type="text"
        className="border border-gray-300 p-2 transition-all rounded-md text-xl font-bold"
        placeholder="여행의 이름을 정해주세요."
      />

      <TextArea
        label={"상세정보"}
        border
        placeholder="상세 내용을 적어주세요."
      />

      <div>목표금액 설정하기 여기다 넣자</div>

      <HStack className="gap-3 border border-lime-500 items-center">
        <button className="border border-gray-400 h-10 w-10 rounded-md text-xl">
          -
        </button>
        <span className="text-lg">4</span>
        <button className="border border-gray-400 h-10 w-10 rounded-md text-xl">
          +
        </button>
        <span className="text-gray-500 font-extralight">
          3박 4일 일정이에요.
        </span>
      </HStack>

      <button className="text-gray-500 underline mr-auto mt-4">
        세부일정 선택하기
      </button>
    </VStack>
  );
}
