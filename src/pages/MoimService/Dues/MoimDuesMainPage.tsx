import { useState } from "react";
import Select2 from "../../../components/common/Select2";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import DemoPage from "../../DemoPage";
import Select from "../../../components/common/Select";
import MoimDepositPage from "./MoimDepositPage";

// 조회결과 없을 때 표시
function NoResultView() {
  return (
    <VStack className="items-center h-full justify-center">
      <div className="border-2 w-10 h-10 text-center border-gray-500 rounded-full font-serif text-3xl font-bold text-gray-500">
        !
      </div>
      <span className="text-lg">조회 결과가 없어요.</span>
    </VStack>
  );
}

interface MoimDeusMainPageProps {}

function MoimDeusMainPage({}: MoimDeusMainPageProps) {
  const [depositOrExpenses, setDepositOrExpenses] = useState<number>(0);
  const [paidOrNot, setPaidOrNot] = useState<number>(0);
  return (
    <VStack className="min-h-full h-full bg-white pb-8">
      <NavigationBar title={"회비내역"} />
      <Select2
        options={["입금", "지출"]}
        onSelect={setDepositOrExpenses}
      ></Select2>
      {depositOrExpenses == 0 ? (
        // 입금 탭
        <>
          <VStack className="p-4">
            <HStack className="items-center text-sm">
              <span>2024년 05월</span>
              <Arrow direction="down" />
            </HStack>
            <HStack className="items-end !gap-0 font-bold">
              <span className="text-xl">21,000</span>
              <span>원</span>
            </HStack>
          </VStack>
          <VStack className="p-4 h-full">
            <NavigationLink className="mb-4" to={{ page: <DemoPage /> }}>
              <HStack className="bg-gray-100 rounded-xl p-4 items-center justify-between">
                <span className="text-gray-500">
                  {"매월 1일 "}
                  <span className="font-bold">10,000원</span>
                  {" 씩 모아요!"}
                </span>
                <Arrow direction="right" />
              </HStack>
            </NavigationLink>
            <Select
              className="w-full"
              options={["회비 낸 사람", "안 낸 사람"]}
              onSelect={setPaidOrNot}
            />
            {paidOrNot == 0 ? (
              <NoResultView />
            ) : (
              <VStack className="items-center h-full justify-center overflow-y-scroll">
                {["문혜영", "안나영", "이신광", "이채원", "최지웅"].map(
                  (name) => (
                    <HStack
                      key={name}
                      className="w-full border-b border-gray-100 py-4 items-center"
                    >
                      <span>{name}</span>
                      <Spacer />
                      <span className="font-bold">0원</span>
                      <Arrow direction="right" />
                    </HStack>
                  )
                )}
                <HStack className="text-sm text-gray-500 items-start">
                  <span>※</span>
                  <span>
                    회비내역의 입금인은 총무가 편집할 수 있으므로, 실제 계좌
                    거래내역의 입금인과 다를 수 있습니다.
                  </span>
                </HStack>
              </VStack>
            )}
            <NavigationLink
              to={{ backgroundColor: "bg-gray-50", page: <MoimDepositPage /> }}
            >
              <Button className="!w-full">회비 입금하기</Button>
            </NavigationLink>
          </VStack>
        </>
      ) : (
        <VStack className="p-4 h-full overflow-y-scroll">
          <HStack className="items-center text-sm">
            <span>2024년 05월</span>
            <Arrow direction="down" />
          </HStack>
          <HStack className="items-end !gap-0 font-bold pb-4 border-b border-gray-200">
            <span className="text-xl">99,999</span>
            <span>원</span>
          </HStack>
          {/* 지출내역 1 */}
          <HStack className="py-4 border-b border-gray-200 justify-between">
            <VStack className="items-start !gap-0">
              <span className="text-sm text-gray-500">05.23(목) 20:20:45</span>
              <span> 문혜영 </span>
            </VStack>
            <VStack className="items-end !gap-0">
              <span className="text-sm text-gray-500">타행송금</span>
              <span className="text-lg text-red-400"> - 10,100원</span>
              <span className="text-sm"> 잔액 0원</span>
            </VStack>
          </HStack>
          {/* 지출내역 2 */}
          <HStack className="py-4 border-b border-gray-200 justify-between">
            <VStack className="items-start !gap-0">
              <span className="text-sm text-gray-500">05.17(금) 14:25:50</span>
              <span> 이신광 </span>
            </VStack>
            <VStack className="items-end !gap-0">
              <span className="text-sm text-gray-500">타행송금</span>
              <span className="text-lg text-red-400"> - 10,000원</span>
              <span className="text-sm"> 잔액 10,100원</span>
            </VStack>
          </HStack>
          <Spacer />
        </VStack>
      )}
    </VStack>
  );
}

export default MoimDeusMainPage;
