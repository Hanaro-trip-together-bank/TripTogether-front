import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { VStack, HStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import useToggle from "../../../hooks/useToggle";
import cn from "../../../utils/cn";
import MoimTripDetailPage from "./MoimTripDetailPage";
import TripImage from "../../../components/trip/TripImg";
import { useFetch } from "../../../hooks/useFetch";
import { TeamTripsGetURL } from "../../../utils/urlFactory";
import { TripResDto } from "../../../types/trip/TripResponseDto";
import Loading from "../../../components/common/Modals/Loading";
import getPeriod from "../../../utils/getPeriod";
import getDaysRemaining from "../../../utils/getDaysRemaining";
import CreateTripPage from "../../CreateTripPage";

interface MoimTripsMainPageProps {
  teamIdx: number;
  currentBalance: number;
  preferTripIdx: number;
}

function MoimTripsMainPage({
  teamIdx,
  currentBalance,
  preferTripIdx,
}: MoimTripsMainPageProps) {
  const [showNewTripModal, toggleShowNewTripModal] = useToggle();
  const [animationStarted, setAnimationStarted] = useState(false);
  const { data, isLoading } = useFetch<null, TripResDto[]>(
    TeamTripsGetURL(teamIdx),
    "GET"
  );
  const portion = (goalAmount: number) =>
    goalAmount == 0 ? 0 : currentBalance / goalAmount;

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const sortedData = data?.sort((a, b) =>
    a.tripIdx === preferTripIdx ? -1 : b.tripIdx === preferTripIdx ? 1 : 0
  );

  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"여행관리"} />
        {/* 상단 어두운부분 */}
        <HStack className="p-4 bg-gray-100 items-center">
          <span>여행 계획</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            {data?.length ?? 0}
          </span>
        </HStack>
        {/* 여행 카드들 */}
        <VStack className="overflow-y-scroll p-6">
          {sortedData?.map((trip) => (
            <VStack
              key={trip.tripIdx}
              className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4"
            >
              <HStack className="w-full justify-between mb-4 overflow-hidden overflow-ellipsis">
                <VStack className="items-start w-64">
                  <span className="font-bold text-xl">{trip.tripName}</span>
                  <span className="text-gray-500">
                    {trip.countryNameKo} 탐방
                  </span>
                  <span className="text-gray-500 !text-wrap">
                    {trip.tripContent}
                  </span>
                  <span className="text-gray-500">
                    {trip.tripStartDay
                      ? getPeriod(trip.tripStartDay, trip.tripDay)
                      : `총 ${trip.tripDay}일`}
                  </span>

                  {trip.tripStartDay && (
                    <span className="text-yellow-500 mb-6">
                      {getDaysRemaining(trip.tripStartDay)}
                    </span>
                  )}
                </VStack>
                <VStack>
                  {preferTripIdx == trip.tripIdx ? (
                    <span className="text-xl text-yellow-300">★</span>
                  ) : (
                    <span className="text-xl">☆</span>
                  )}

                  <span className="text-gray-500 underline text-sm text-nowrap">
                    관리
                  </span>
                </VStack>
              </HStack>
              <HStack className="relative justify-center h-52 text-primary">
                <TripImage type={trip.tripImg ?? 0} />
                <VStack
                  className={cn(
                    "items-center justify-end absolute w-full bg-white/75 transition-all duration-500 delay-100 ease-out",
                    animationStarted ? "" : "h-full"
                  )}
                  style={{
                    height: `${
                      portion(trip.tripGoalAmount) < 1
                        ? (1 - portion(trip.tripGoalAmount)) * 100
                        : 0
                    }%`,
                  }}
                >
                  <VStack className="!gap-0 text-primary font-bold">
                    <span className="text-start">
                      {currentBalance.toLocaleString()}
                    </span>
                    <span className="w-full text-end">
                      / {trip.tripGoalAmount.toLocaleString()} ₩ (
                      {portion(trip.tripGoalAmount) * 100}%)
                    </span>
                  </VStack>
                </VStack>
              </HStack>
              <NavigationLink
                className="w-full"
                to={{
                  page: <MoimTripDetailPage trip={trip} />,
                }}
              >
                <Button className="w-full">더보기</Button>
              </NavigationLink>
            </VStack>
          ))}
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
                page: <CreateTripPage />,
              }}
            >
              <Button className="w-full" onClick={toggleShowNewTripModal}>
                확인
              </Button>
            </NavigationLink>
          </HStack>
        </VStack>
      </Modal>
      <Loading show={isLoading} label="여행 목록을 조회하는 중 ..." />
    </>
  );
}

export default MoimTripsMainPage;
