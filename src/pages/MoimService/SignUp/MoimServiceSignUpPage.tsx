import { useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import Option from "../../../components/common/Option";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import Modal from "../../../components/common/Modals/Modal";

interface MoimServiceSignUpPageProps {
  onDone: () => void;
}
function MoimServiceSignUpPage({ onDone }: MoimServiceSignUpPageProps) {
  const { back } = useNavigation();
  const [page1Done, setPage1Done] = useState(false);
  const [page2Done, setPage2Done] = useState(false);
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const openInvitationModal = () => {
    setShowInvitationModal(true);
  };
  const closeInvitationModal = () => {
    setShowInvitationModal(false);
  };
  const signUpDone = () => {
    onDone();
    back();
  };
  if (page2Done)
    return (
      <>
        <VStack className="w-full h-full items-center">
          <NavigationBar title={"가입완료"} onBack={signUpDone} />
          <VStack className="w-full h-full items-center p-6 gap-6 pt-12">
            {/* 동그라미 속 체크 */}
            <div className="border-2 border-black rounded-full p-2 text-primary">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline
                  points="20 6 9 17 4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <span className="w-full text-2xl text-gray-500 text-center">
              <span className="text-black font-bold">하나로 모임</span>
              을 <br />
              만들었어요
            </span>
            <Button className="w-full !bg-gray-50 !text-black py-4 !rounded-2xl font-bold">
              <HStack className="w-full items-center justify-between">
                <span>모임통장 카드 만들기</span>
                <Arrow direction="right" />
              </HStack>
            </Button>
            <Spacer />
            <VStack className="absolute bottom-16 right-4 !gap-0 items-center">
              <div className="bg-secondary p-2 rounded-xl text-white">
                모임원을 초대해보세요! 😊
              </div>
              <div className="border-8 w-0 h-0 border-secondary !border-x-transparent !border-b-transparent" />
            </VStack>
            <HStack className="w-full gap-2">
              <Button className="!w-1/2" onClick={signUpDone}>
                확인
              </Button>
              <Button className="!w-1/2" onClick={openInvitationModal}>
                초대하기
              </Button>
            </HStack>
          </VStack>
        </VStack>
        <Modal
          xButton
          backDrop
          show={showInvitationModal}
          onClose={closeInvitationModal}
        >
          <VStack className="w-full items-center">
            <span>초대하기</span>
            <HStack className="m-6 gap-4">
              <img
                className="h-20"
                src={`/images/moim/invite.png`}
                alt="invite"
              />
            </HStack>
            <Button className="w-full" onClick={closeInvitationModal}>
              확인
            </Button>
          </VStack>
        </Modal>
      </>
    );

  if (page1Done)
    return (
      <VStack className="w-full h-full items-center">
        <NavigationBar title={"서비스가입"} />
        <VStack className="w-full h-full items-center p-6 gap-6">
          {/* 모임 타입 선택 */}
          <span className="w-full text-2xl font-bold">어떤 모임인가요?</span>
          <img className="h-40" src={`/images/moim/plane.png`} alt="plane" />
          <span>여행</span>
          <HStack className="w-full overflow-x-scroll">
            <Option>모임</Option>
            <Option>가족</Option>
            <Option>결혼</Option>
            <Option selected>여행</Option>
            <Option>쇼핑</Option>
            <Option>저축</Option>
          </HStack>
          {/* 모임 이름 입력 */}
          <input
            type="text"
            className="w-full border-b border-black pb-1"
            placeholder="모임 이름을 입력해 주세요"
          />
          {/* 선호 여행 지역 선택 */}
          <span className="w-full">선호 여행 지역</span>
          <HStack className="w-full">
            <Option selected>국내</Option>
            <Option>해외</Option>
            <Option>모두</Option>
          </HStack>
          <Spacer />
          <Button className="w-full" onClick={() => setPage2Done(true)}>
            다음
          </Button>
        </VStack>
      </VStack>
    );

  return (
    <VStack className="w-full h-full items-center">
      <NavigationBar title={"서비스가입"} />
      <VStack className="w-full h-full items-center p-6 gap-6">
        <span className="w-full text-2xl font-bold">
          어떤 계좌로 시작할까요?
        </span>
        <select className="w-full custom-select border-b rounded-none border-black">
          <option>계좌 선택</option>
        </select>
        {/* 아래쪽 왕화살표 */}
        <svg
          width="100"
          height="50"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <polyline
            points="2.5,2.5 12.5,10 22.5,2.5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <Button className="w-full !bg-white border border-primary border-dashed text-primary py-4 !rounded-2xl font-bold">
          모임 통장
        </Button>
        <Button className="w-full !bg-gray-50 !text-black py-4 !rounded-2xl font-bold">
          <HStack className="w-full items-center justify-between">
            <span>새로운 계좌 만들기</span>
            <Arrow direction="right" />
          </HStack>
        </Button>
        <Spacer />
        <Button
          className="!rounded-full !px-4"
          onClick={() => setPage1Done(true)}
        >
          계속
        </Button>
      </VStack>
    </VStack>
  );
}
export default MoimServiceSignUpPage;
