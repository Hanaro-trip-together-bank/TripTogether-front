import Arrow from "../../../components/common/Arrow";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Toggle from "../../../components/common/Toggle";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";

interface MoimManagementPageProps {}

function MoimManagementPage({}: MoimManagementPageProps) {
  return (
    <>
      <VStack className="min-h-full bg-gray-50 pb-8">
        <NavigationBar title={"모임 설정"} />
        <VStack className="w-full px-6">
          {/* 모임 요약 카드 */}
          <VStack className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4 !gap-0">
            <HStack className="w-full justify-between mb-4 pb-4 border-b border-gray-200">
              <VStack className="items-start">
                <span className="font-bold">하나로</span>
                <span className="text-gray-500">123-123456-12345</span>
              </VStack>
              <div className="w-10 h-10 bg-blue-100 rounded-xl">
                <img src={`/images/moim/plane.png`} alt="plane" />
              </div>
            </HStack>
            <HStack className="justify-end items-end !gap-0">
              <span className="font-sm text-gray-500">잔액</span>
              <Spacer />
              <span className="font-bold text-lg">0</span>
              <span>원</span>
            </HStack>
          </VStack>
          {/* 메뉴 */}

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 알림설정 </span>
            <Toggle onClick={() => {}} />
          </HStack>

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 약관/동의서/유의사항 </span>
            <Arrow direction="right" />
          </HStack>

          <HStack className="py-4 border-b border-gray-200 w-full justify-between">
            <span> 자동이체 </span>
            <Arrow direction="right" />
          </HStack>
        </VStack>
        <Spacer />
      </VStack>
    </>
  );
}

export default MoimManagementPage;
