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
import {
  PreferTripPutURL,
  TeamTripsGetURL,
  TipsDeleteURL,
} from "../../../utils/urlFactory";
import {
  TripListResDto,
  TripResDto,
} from "../../../types/trip/TripResponseDto";
import Loading from "../../../components/common/Modals/Loading";
import getPeriod from "../../../utils/getPeriod";
import getDaysRemaining from "../../../utils/getDaysRemaining";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { PreferTripReqDto } from "../../../types/team/TeamRequestDto";
import { useAuth } from "../../../contexts/useAuth";
import CreateTripPage from "../../CreateTripPage";
import { useModal } from "../../../hooks/useModal";

interface MoimTripsMainPageProps {
  teamIdx: number;
  currentBalance: number;
}

function MoimTripsMainPage({
  teamIdx,
  currentBalance,
}: MoimTripsMainPageProps) {
  const { member } = useAuth();
  const [showNewTripModal, toggleShowNewTripModal] = useToggle();
  const [animationStarted, setAnimationStarted] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripResDto>();

  const tripDeleteFetcher = useFetchTrigger(
    TipsDeleteURL(selectedTrip?.tripIdx ?? 0),
    "DELETE"
  );

  const { modal: deletedModal, triggerModal: triggerDeletedModal } = useModal(
    `${selectedTrip?.tripName ?? "여행"} 계획을 삭제했습니다.`,
    () => {
      refetch();
    },
    false
  );
  const { modal: deleteModal, triggerModal: triggerDeleteModal } = useModal(
    `정말로 ${selectedTrip?.tripName ?? "여행"} 계획을 삭제할까요?`,
    () => {
      tripDeleteFetcher.trigger(null);
      triggerDeletedModal();
    }
  );
  const { data, isLoading, refetch } = useFetch<null, TripListResDto>(
    TeamTripsGetURL(teamIdx),
    "GET"
  );

  const { trigger } = useFetchTrigger<PreferTripReqDto, void>(
    PreferTripPutURL(),
    "PUT"
  );

  const portion = (goalAmount: number) =>
    goalAmount == 0 ? 0 : currentBalance / goalAmount;

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const sortedData = data?.trips.sort((a, b) =>
    a.tripIdx === data.preferTripIdx
      ? -1
      : b.tripIdx === data.preferTripIdx
        ? 1
        : 0
  );

  const requestPrefer = (idx: number) => {
    const dto: PreferTripReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
      tripIdx: idx,
    };
    trigger(dto);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  const requestDeletePrefer = () => {
    const dto: PreferTripReqDto = {
      teamIdx: teamIdx,
      memberIdx: member.memberIdx,
      tripIdx: null,
    };
    trigger(dto);
    setTimeout(() => {
      refetch();
    }, 500);
  };

  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"여행관리"} />
        {/* 상단 어두운부분 */}
        <HStack className="p-4 bg-gray-100 items-center">
          <span>여행 계획</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            {data?.trips.length ?? 0}
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
                  {data?.preferTripIdx == trip.tripIdx ? (
                    <button
                      className="text-xl text-yellow-300"
                      onClick={() => requestDeletePrefer()}
                    >
                      ★
                    </button>
                  ) : (
                    <button
                      className="text-xl"
                      onClick={() => requestPrefer(trip.tripIdx)}
                    >
                      ☆
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedTrip(trip);
                      triggerDeleteModal();
                    }}
                  >
                    <TrashCan />
                  </button>
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
                      {(portion(trip.tripGoalAmount) * 100).toFixed(1)}%)
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
      {deleteModal}
      {deletedModal}
    </>
  );
}

export default MoimTripsMainPage;

function TrashCan() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M9.1709 4C9.58273 2.83481 10.694 2 12.0002 2C13.3064 2 14.4177 2.83481 14.8295 4"></path>
      <path d="M20.5001 6H3.5" stroke="#1C274C"></path>
      <path d="M18.8332 8.5L18.3732 15.3991C18.1962 18.054 18.1077 19.3815 17.2427 20.1907C16.3777 21 15.0473 21 12.3865 21H11.6132C8.95235 21 7.62195 21 6.75694 20.1907C5.89194 19.3815 5.80344 18.054 5.62644 15.3991L5.1665 8.5"></path>
      <path d="M9.5 11L10 16"></path> <path d="M14.5 11L14 16"></path>
    </svg>
  );
}
