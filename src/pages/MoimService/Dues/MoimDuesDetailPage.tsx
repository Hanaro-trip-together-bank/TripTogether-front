import { useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import Arrow from "../../../components/common/Arrow";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/common/Modals/Modal";

interface MoimDuesDetailPageProps {
  name: string;
}

function MoimDuesDetailPage({ name }: MoimDuesDetailPageProps) {
  const [member, setMember] = useState<string>(name);
  const [showMemberList, toggleShowMemberList] = useToggle();
  return (
    <>
      <VStack className="min-h-full h-full bg-white pb-8">
        <NavigationBar title={"회비내역"} />
        <VStack className="p-4 h-full overflow-y-scroll">
          {/* 멤버 선택 */}
          <button onClick={toggleShowMemberList}>
            <HStack className="items-center font-bold mb-4">
              <span className="text-xl">{name}</span>
              <Arrow direction="down" />
            </HStack>
          </button>
          {/* 총 입금액 */}
          <VStack className="w-full p-4 rounded-xl bg-gray-100 mb-4">
            <span> 총 입금액 </span>
            <span>
              <span className="font-bold text-xl">
                {(10000).toLocaleString()}
              </span>
              원
            </span>
          </VStack>
          {/* 년도 */}
          <HStack className="w-full items-center justify-end text-sm">
            <span>2024년</span>
            <Arrow direction="down" />
          </HStack>
          {/* 개월 리스트 */}
          <VStack className="max-h-full w-full border-y border-gray-200 my-4 overflow-y-scroll">
            <HStack className="py-4 items-cente gap-4">
              <span> 5월 </span>
              <span className="text-xs bg-gray-100 rounded-sm py-0.5 px-1 h-fit">
                충족
              </span>
              <Spacer />
              <span className="font-bold"> {(10000).toLocaleString()}원</span>
            </HStack>
            <HStack className="py-4 items-center gap-4">
              <span> 4월 </span>
              <span className="text-xs bg-gray-100 rounded-sm py-0.5 px-1 h-fit">
                충족
              </span>
              <Spacer />
              <span className="font-bold"> {(10000).toLocaleString()}원</span>
            </HStack>
            <HStack className="py-4 items-center gap-4">
              <span> 3월 </span>
              <span className="text-xs bg-gray-100 rounded-sm py-0.5 px-1 h-fit">
                충족
              </span>
              <Spacer />
              <span className="font-bold"> {(10000).toLocaleString()}원</span>
            </HStack>
          </VStack>
          <Spacer />
        </VStack>
      </VStack>
      <Modal
        xButton
        backDrop
        modalType="sheet"
        show={showMemberList}
        onClose={toggleShowMemberList}
      >
        <VStack className="w-full">
          <span className="w-full pb-4 text-center border-b border-gray-200">
            모임원 선택
          </span>
          <VStack className="max-h-72 overflow-scroll gap-4 py-4">
            <HStack className="w-full justify-between">
              <span>안나영</span>
              <Arrow direction="right" />
            </HStack>
            <HStack className="w-full justify-between">
              <span>이신광</span>
              <Arrow direction="right" />
            </HStack>
            <HStack className="w-full justify-between">
              <span>최지웅</span>
              <Arrow direction="right" />
            </HStack>
          </VStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimDuesDetailPage;

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
