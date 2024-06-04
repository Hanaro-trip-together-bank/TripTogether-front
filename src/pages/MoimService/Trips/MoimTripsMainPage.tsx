import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { VStack, HStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import MoimServiceSignUpPage from "../SignUp/MoimServiceSignUpPage";
import useToggle from "../../../hooks/useToggle";
import cn from "../../../utils/cn";
import MoimTripDetailPage from "./MoimTripDetailPage";
import TripImage from "../../../components/trip/TripImg";

interface MoimTripsMainPageProps {}

function MoimTripsMainPage({}: MoimTripsMainPageProps) {
  const [showNewTripModal, toggleShowNewTripModal] = useToggle();
  const [animationStarted, setAnimationStarted] = useState(false);
  useEffect(() => {
    setAnimationStarted(true);
  }, []);
  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"여행관리"} />
        {/* 상단 어두운부분 */}
        <HStack className="p-4 bg-gray-100 items-center">
          <span>여행 계획</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            3
          </span>
        </HStack>
        {/* 여행 카드들 */}
        <VStack className="overflow-y-scroll p-6">
          {/* 카드 1 */}
          <VStack className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4">
            <HStack className="w-full justify-between mb-4">
              <VStack className="items-start">
                <span className="font-bold text-xl">여행1</span>
                <span className="text-gray-500">파리 탐방</span>
                <span className="text-gray-500">
                  25.07.01 ~ 25.07.07
                  <span className="text-yellow-500"> D-33 </span>
                </span>
              </VStack>
              <VStack>
                {/* <span className="text-xl">☆</span> */}
                <span className="text-xl text-yellow-300">★</span>
                <span className="text-gray-500 underline text-sm">관리</span>
              </VStack>
            </HStack>
            <HStack className="relative justify-center h-52 text-primary">
              <TripImage type={1} />
              <VStack
                className={cn(
                  "items-center justify-end absolute w-full bg-white/75 transition-all duration-500 delay-100 ease-out",
                  animationStarted ? "h-1/2" : "h-full"
                )}
              >
                <span className="text-primary  font-bold">
                  25,000 / 50,000 € (50%)
                </span>
              </VStack>
            </HStack>
            <NavigationLink
              className="w-full"
              to={{
                page: <MoimTripDetailPage />,
              }}
            >
              <Button className="w-full">더보기</Button>
            </NavigationLink>
          </VStack>

          {/* 카드 2 */}
          <VStack className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4">
            <HStack className="w-full justify-between mb-4">
              <VStack className="items-start">
                <span className="font-bold text-xl">여행2</span>
                <span className="text-gray-500">이탈리아 탐방</span>
                <span className="text-gray-500">
                  25.07.01 ~ 25.07.07
                  <span className="text-yellow-500"> D-33 </span>
                </span>
              </VStack>
              <VStack>
                {/* <span className="text-xl">☆</span> */}
                <span className="text-xl text-yellow-300">★</span>
                <span className="text-gray-500 underline text-sm">관리</span>
              </VStack>
            </HStack>
            <HStack className="relative justify-center h-52 text-primary">
              <TripImage type={2} />
              <VStack
                className={cn(
                  "items-center justify-end absolute w-full bg-white/75 transition-all duration-500 delay-100 ease-out",
                  animationStarted ? "h-1/2" : "h-full"
                )}
              >
                <span className="text-primary  font-bold">
                  25,000 / 50,000 € (50%)
                </span>
              </VStack>
            </HStack>
            <NavigationLink
              className="w-ful"
              to={{ page: <MoimTripDetailPage /> }}
            >
              <Button className="w-full">더보기</Button>
            </NavigationLink>
          </VStack>

          <Button
            className="w-full !bg-gray-100 !text-black"
            onClick={toggleShowNewTripModal}
          >
            <span className="text-gray-500">+</span> 여행 계획 추가하기
          </Button>
        </VStack>
      </VStack>
      {/* 새 여행 계획 생성 모달 */}
      <Modal show={showNewTripModal} onClose={toggleShowNewTripModal} backDrop>
        <VStack>
          <span className="text-bold text-gray-500 pb-4">
            새로운 여행 계획을 만드시겠어요?
          </span>
          <HStack>
            <Button gray onClick={toggleShowNewTripModal}>
              취소
            </Button>
            <NavigationLink
              className="flex-grow"
              to={{
                page: <MoimServiceSignUpPage onDone={() => {}} />,
              }}
            >
              <Button className="w-full" onClick={toggleShowNewTripModal}>
                확인
              </Button>
            </NavigationLink>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}
export default MoimTripsMainPage;
