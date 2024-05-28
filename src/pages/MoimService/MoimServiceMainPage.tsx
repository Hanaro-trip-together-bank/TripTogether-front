import { useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modals/Modal";
import { HStack, VStack } from "../../components/common/Stack";
import NavigationBar from "../../components/common/TopBars/NavigationBar";
import NavigationLink from "../../components/common/Navigation/NavigationLink";
import MoimServiceSignUpPage from "./SignUp/MoimServiceSignUpPage";
import MoimDetailPage from "./MoimDetailPage";

interface MoimServiceMainPageProps {}

function MoimServiceMainPage({}: MoimServiceMainPageProps) {
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);

  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"모임서비스"} />
        {/* 상단 어두운부분 */}
        <HStack className="p-4 bg-gray-100 items-center">
          <span>내 모임통장</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            3
          </span>
        </HStack>
        {/* 모임통장 카드들 */}
        <VStack className="overflow-y-scroll p-6">
          {/* 카드 4 */}
          <NavigationLink
            to={{ backgroundColor: "bg-white", page: <MoimDetailPage /> }}
          >
            <VStack className="rounded-2xl h-32 w-full bg-white shadowed px-6 py-4 mb-4">
              <HStack className="w-full justify-between mb-4">
                <VStack>
                  <span className="font-bold">하나로</span>
                  <span className="text-gray-500">123-123456-12345</span>
                </VStack>
                <VStack className="text-xs gap-0 text-gray-500 scale-50">
                  <span>●</span>
                  <span>●</span>
                  <span>●</span>
                </VStack>
              </HStack>
              <HStack className="justify-end items-end">
                <span className="font-bold text-lg">0</span>
                <span>원</span>
              </HStack>
            </VStack>
          </NavigationLink>
          {/* 카드 4 */}
          <VStack className="rounded-2xl h-32 w-full bg-white shadowed px-6 py-4 mb-4">
            <HStack className="w-full justify-between mb-4">
              <VStack>
                <span className="font-bold">하나로</span>
                <span className="text-gray-500">123-123456-12345</span>
              </VStack>
              <VStack className="text-xs gap-0 text-gray-500 scale-50">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </VStack>
            </HStack>
            <HStack className="justify-end items-end">
              <span className="font-bold text-lg">0</span>
              <span>원</span>
            </HStack>
          </VStack>
          {/* 카드 4 */}
          <VStack className="rounded-2xl h-32 w-full bg-white shadowed px-6 py-4 mb-4">
            <HStack className="w-full justify-between mb-4">
              <VStack>
                <span className="font-bold">하나로</span>
                <span className="text-gray-500">123-123456-12345</span>
              </VStack>
              <VStack className="text-xs gap-0 text-gray-500 scale-50">
                <span>●</span>
                <span>●</span>
                <span>●</span>
              </VStack>
            </HStack>
            <HStack className="justify-end items-end">
              <span className="font-bold text-lg">0</span>
              <span>원</span>
            </HStack>
          </VStack>
          <Button
            className="w-full !bg-gray-100 !text-black"
            onClick={() => setShowNewAccountModal(true)}
          >
            <span className="text-gray-500">+</span> 모임 추가하기
          </Button>
        </VStack>
      </VStack>
      <Modal
        show={showNewAccountModal}
        onClose={() => setShowNewAccountModal(false)}
        backDrop
      >
        <VStack>
          {
            //TODO: 통장 개수 없을 때만 보여줄 문장
            true && (
              <span className="text-bold text-gray-500 text-center">
                참여중인 모임이 없어요.
              </span>
            )
          }
          <span className="text-bold text-gray-500 pb-4">
            모임통장 서비스를 이용하시겠어요?
          </span>
          <HStack>
            <Button gray onClick={() => setShowNewAccountModal(false)}>
              취소
            </Button>
            <NavigationLink
              className="flex-grow"
              to={{
                page: <MoimServiceSignUpPage onDone={() => {}} />,
              }}
            >
              <Button
                className="w-full"
                onClick={() => setShowNewAccountModal(false)}
              >
                확인
              </Button>
            </NavigationLink>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}
export default MoimServiceMainPage;
