import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { VStack, HStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import MoimDetailPage from "../MoimDetailPage";
import MoimServiceSignUpPage from "../SignUp/MoimServiceSignUpPage";
import useToggle from "../../../hooks/useToggle";
import cn from "../../../utils/cn";

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
              <Eiffel />
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
              to={{ backgroundColor: "bg-white", page: <MoimDetailPage /> }}
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
              <Colosseum />
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
              to={{ backgroundColor: "bg-white", page: <MoimDetailPage /> }}
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

function Eiffel() {
  return (
    <svg
      fill="currentColor"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-351 153 256 256"
    >
      <path d="M-187.1,350.7c1,0,1.6,0,1.6,0v-8.9v-3.2h-7c-5.3-12.5-9.4-24.1-12.5-34.7h5.6v-7.3h-7.6c-9.2-34.2-11.7-103.1-11.7-103.1 c2.2-1.4,3.6-3.9,3.6-6.7c0-3.8-2.7-7-6.3-7.8v-13h-3.3v13c-3.6,0.8-6.3,4-6.3,7.8c0,2.8,1.4,5.2,3.6,6.7c0,0-2.5,68.8-11.7,103.1 h-7.6v7.3h5.6c-3.1,10.6-7.2,22.3-12.5,34.7h-7v12.1h1.6c-7.3,15.5-16.4,32.1-27.8,49.3h28.9c0,0,0-38.6,34.9-38.6 s34.9,38.6,34.9,38.6h28.9C-170.7,382.8-179.8,366.2-187.1,350.7z M-231,311.5h16c1.3,7.5,4.5,21.5,5.8,27.1h-27.7 C-235.6,333-232.3,319-231,311.5z"></path>
    </svg>
  );
}

function Colosseum() {
  return (
    <svg
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
    >
      <path d="M269.544,226.272V122.623h-86.534V42.35C109.27,49.314,45.182,65.854,0,88.403v349.774 c38.674,16.666,155.178,31.473,261.455,31.473c100.1,0,202.067-14.807,250.545-26.309V226.272H269.544z M112.76,177.092 c0-10.024,7.759-18.146,17.342-18.146c9.575,0,17.351,8.122,17.351,18.146v36.299h-17.351H112.76V177.092z M112.76,287.072 c0-10.023,7.759-18.146,17.342-18.146c9.575,0,17.351,8.122,17.351,18.146v36.3h-17.351H112.76V287.072z M34.744,177.092 c0-10.024,6.989-18.146,15.619-18.146c8.62,0,15.618,8.122,15.618,18.146v36.299H50.362H34.744V177.092z M34.744,284.105 c0-10.015,6.989-18.144,15.619-18.144c8.62,0,15.618,8.13,15.618,18.144v36.3H50.362H34.744V284.105z M50.396,420.124 l-15.626-7.176l-0.034-29.106c-0.008-10.016,6.981-18.154,15.61-18.163c8.621-0.017,15.626,8.106,15.626,18.12l0.042,36.299 L50.396,420.124z M130.136,427.435l-17.351,0.025l-0.034-36.299c-0.017-10.032,7.742-18.163,17.326-18.171 c9.584-0.008,17.35,8.105,17.368,18.128l0.034,36.308L130.136,427.435z M196.489,177.092c0-10.024,8.062-18.146,18.027-18.146 c9.965,0,18.036,8.122,18.036,18.146v36.299h-18.036h-18.027V177.092z M196.489,291.518c0-10.032,8.062-18.154,18.027-18.154 c9.965,0,18.036,8.122,18.036,18.154V327.8h-18.036h-18.027V291.518z M214.55,432.285l-18.036,0.009l-0.034-36.291 c-0.018-10.023,8.054-18.153,18.01-18.17c9.964-0.009,18.044,8.105,18.052,18.137l0.042,36.291L214.55,432.285z M444.946,284.105 c0-10.015,6.71-18.144,15.001-18.144c8.282,0,14.993,8.13,14.993,18.144v36.3h-14.993h-15.001V284.105z M366.694,287.072 c0-10.023,7.454-18.146,16.658-18.146c9.204,0,16.666,8.122,16.666,18.146v36.3h-16.666h-16.658V287.072z M281.84,291.518 c0-10.032,8.071-18.154,18.027-18.154c9.964,0,18.044,8.122,18.044,18.154V327.8h-18.044H281.84V291.518z M299.91,432.184 l-18.036,0.025l-0.042-36.299c-0.009-10.032,8.054-18.154,18.018-18.171c9.956-0.008,18.036,8.105,18.053,18.137l0.042,36.299 L299.91,432.184z M383.385,427.164l-16.666,0.018l-0.034-36.3c-0.009-10.023,7.438-18.162,16.64-18.17 c9.204-0.008,16.666,8.106,16.684,18.137l0.034,36.291L383.385,427.164z M459.973,419.667l-15.002,0.009l-0.034-36.299 c-0.009-10.016,6.702-18.154,14.984-18.163c8.291-0.009,15.019,8.105,15.019,18.128l0.042,29.098L459.973,419.667z"></path>
    </svg>
  );
}
