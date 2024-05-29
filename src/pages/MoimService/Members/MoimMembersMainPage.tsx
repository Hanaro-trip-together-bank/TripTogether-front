import Arrow from "../../../components/common/Arrow";
import Avatar from "../../../components/common/Avatar";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import useToggle from "../../../hooks/useToggle";

interface MoimMembersMainPageProps {}

function MoimMembersMainPage({}: MoimMembersMainPageProps) {
  const { home } = useNavigation();
  const [showMoimExitModal, toggleShowMoimExitModal] = useToggle();
  const [showMoimExitedModal, toggleShowMoimExitedModal] = useToggle();
  return (
    <>
      <VStack className="min-h-full bg-gray-50 pb-8">
        <NavigationBar title={"모임원 관리"} />
        <HStack className="justify-between items-center mx-6 py-4 border-b border-gray-200">
          <span>2명 참여 중</span>
          <Button className="!bg-gray-200 !text-black">초대하기</Button>
        </HStack>
        <VStack className="min-w-full overflow-y-scroll px-6 gap-8">
          {/* 총무 */}
          <VStack className="w-full gap-4">
            <span className="text-sm"> 총무 </span>
            <HStack className="items-center gap-4">
              <Avatar crown />
              <span> 문혜영</span>
              <Spacer />
              <span className="text-sm text-gray-500 underline">총무변경</span>
            </HStack>
          </VStack>
          {/* 대기 중 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 대기 중 </span>
              <span className="text-sm text-gray-500 underline">
                전체 수락하기
              </span>
            </HStack>
            <HStack className="items-center gap-4">
              <Avatar
                backgroundColor="bg-cyan-200"
                skinColor="white"
                eye="smile"
              />
              <span> 이신광</span>
              <Spacer />
              <span className="text-sm text-gray-500 underline">거절</span>
              <span className="text-sm text-gray-500 underline">수락</span>
            </HStack>
          </VStack>
          {/* 모임원 */}
          <VStack className="w-full gap-4">
            <HStack className="justify-between">
              <span className="text-sm"> 모임원 </span>
              <span className="text-sm text-gray-500 underline">
                전체 내보내기
              </span>
            </HStack>
            <HStack className="items-center gap-4">
              <Avatar
                crown
                backgroundColor="bg-purple-400"
                mouth="upset"
                eye="upset"
              />
              <span> 문혜영</span>
              <Spacer />
              <span className="text-sm text-gray-500 underline">내보내기</span>
            </HStack>
          </VStack>
        </VStack>
        <Spacer />
        <button className="border-y border-gray-200 py-4 mx-6">
          <HStack onClick={toggleShowMoimExitModal}>
            <span> 모임나가기</span>
            <Spacer />
            <Arrow direction="right" />
          </HStack>
        </button>
      </VStack>
      {/* 모임 나가기 확인 모달 */}
      <Modal
        xButton
        backDrop
        show={showMoimExitModal}
        onClose={toggleShowMoimExitModal}
      >
        <VStack className="w-72 items-center gap-4">
          <span>모임에서 나갈까요?</span>
          <HStack className="w-full">
            <Button gray roundedFull onClick={toggleShowMoimExitModal}>
              취소
            </Button>
            <Button
              className="flex-grow"
              roundedFull
              onClick={() => {
                toggleShowMoimExitModal();
                toggleShowMoimExitedModal();
              }}
            >
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 모임 나갔다는 모달 */}
      <Modal show={showMoimExitedModal} onClose={toggleShowMoimExitedModal}>
        <VStack className="w-72 items-center gap-4">
          <span>모임에서 나왔습니다.</span>
          <HStack className="w-full">
            <Button className="flex-grow" roundedFull onClick={home}>
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimMembersMainPage;
