/* eslint-disable react-hooks/exhaustive-deps */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modals/Modal";
import { HStack, Spacer, VStack } from "../../components/common/Stack";
import NavigationBar from "../../components/common/TopBars/NavigationBar";
import Arrow from "../../components/common/Arrow";
import NavigationLink from "../../components/common/Navigation/NavigationLink";
import MoimDepositPage from "./Dues/MoimDepositPage";
import Avatar from "../../components/common/Avatar";
import MoimMembersMainPage from "./Members/MoimMembersMainPage";
import MoimTripsMainPage from "./Trips/MoimTripsMainPage";
import MoimDuesMainPage from "./Dues/MoimDuesMainPage";
import MoimManagementPage from "./Management/MoimManagementPage";
import {
  DetailTeamReqDto,
  UpdateTeamNoticeReq,
} from "../../types/team/TeamRequestDto";
import { useFetch } from "../../hooks/useFetch";
import { DetailTeamResDto } from "../../types/team/TeamResponseDto";
import {
  MoimDetailPostURL,
  NoticePutURL,
  TripsGetURL,
} from "../../utils/urlFactory";
import formatAccNo from "../../utils/formatAccNo";
import Loading from "../../components/common/Modals/Loading";
import { useFetchTrigger } from "../../hooks/useFetchTrigger";
import { colorPacks } from "../../utils/colorPack.ts";
import MoimTripDetailPage from "./Trips/MoimTripDetailPage.tsx";
import { TripResDto } from "../../types/trip/TripResponseDto";
import getPeriod from "../../utils/getPeriod.ts";
import getDaysRemaining from "../../utils/getDaysRemaining.ts";
import cn from "../../utils/cn.ts";
import uuid from "../../utils/uuid.ts";
import { useNavigation } from "../../contexts/useNavigation.tsx";

interface MoimDetailPageProps {
  teamIdx: number;
  accIdx: number;
  teamName: string;
  teamMemberIdx: number;
  teamMemberStatus: string;
  preferTripIdx: number;
}

function MoimDetailPage({
  accIdx,
  teamIdx,
  teamName,
  teamMemberIdx,
  teamMemberStatus,
}: MoimDetailPageProps) {
  const { path, navigateTo } = useNavigation();
  const currentPathLength = useMemo(() => path.length, []);
  const [notice, setNotice] = useState<string>("");
  const [showNoticeEdit, setShowNoticeEdit] = useState(false);

  // 모임서비스 상세 데이터 불러오기
  const requestData: DetailTeamReqDto = {
    teamIdx: teamIdx,
    teamMemberIdx: teamMemberIdx,
  };

  const {
    data: moimDetailData,
    isLoading: moimDetailDataIsLoading,
    refetch,
  } = useFetch<DetailTeamReqDto, DetailTeamResDto>(
    MoimDetailPostURL(),
    "POST",
    requestData
  );
  const { data: preferTrip, refetch: refetchPreferTrip } = useFetch<
    null,
    TripResDto
  >(TripsGetURL(moimDetailData?.preferTripIdx ?? 0), "GET");

  // 뒤로가기로 이 페이지로 돌아왔을 때 리페치
  useEffect(() => {
    if (path.length == currentPathLength) {
      refetchPreferTrip();
      refetch();
    }
  }, [path.length]);
  useEffect(() => {
    if (path.length == currentPathLength) refetchPreferTrip();
  }, [moimDetailData?.preferTripIdx]);

  const { trigger } = useFetchTrigger<UpdateTeamNoticeReq, void>(
    NoticePutURL(),
    "PUT"
  );

  useEffect(() => {
    if (!moimDetailData) return;
    setNotice(moimDetailData.teamNotice || "");
  }, [moimDetailData]);

  const requestNoticeData: UpdateTeamNoticeReq = {
    teamIdx: teamIdx,
    teamNotice: notice,
  };

  const handleNoticeRequest = () => {
    trigger(requestNoticeData);
    setShowNoticeEdit(false);
    setTimeout(() => {
      refetch();
    }, 500);
  };
  const amountGraphBase = Math.max(
    preferTrip?.tripGoalAmount ?? 0,
    preferTrip?.tripExpectedAmount ?? 0,
    moimDetailData?.accBalance ?? 0
  );

  return (
    <>
      <VStack className="min-h-full bg-gray-50">
        <NavigationBar title={"모임서비스"} />
        {/* 공지사항 */}
        <div className="w-full py-4 px-6">
          <Button
            className="w-full !bg-gray-200 !text-black text-left !rounded-2xl !px-4 py-3"
            onClick={() => setShowNoticeEdit(true)}
          >
            <HStack>
              <MegaPhone />
              {moimDetailData?.teamNotice == null
                ? "공지를 등록해 주세요."
                : moimDetailData?.teamNotice}
            </HStack>
          </Button>
        </div>
        {/* 모임 요약 카드 + 즐겨찾기한 여행 */}
        <Swiper className="w-full" slidesPerView={1.1} centeredSlides>
          <SwiperSlide>
            <VStack className="!gap-0 bg-white shadowed rounded-2xl m-2 mb-8 p-4">
              <HStack className="items-center">
                <Avatar
                  crown={teamMemberStatus == "총무"}
                  backgroundColor={
                    colorPacks[teamMemberIdx % colorPacks.length]
                      .backgroundColor
                  }
                  seed={teamMemberIdx}
                  skinColor="white"
                  eye="smile"
                  random
                />
                <span className="text-lg font-bold">
                  {moimDetailData?.teamName}
                </span>
                <span className="text-lg text-primary font-bold"> 1</span>
                <Arrow direction="right" />
                <Spacer />
                <span className="text-sm text-gray-500 underline">관리</span>
                <span className="text-sm text-gray-500">|</span>
                <span className="text-sm text-gray-500 underline">환전</span>
              </HStack>

              <span className="text-sm text-gray-500">
                {moimDetailData ? (
                  <span className="text-sm text-gray-500">
                    {formatAccNo(moimDetailData.accNumber)}
                  </span>
                ) : (
                  "000-000000-00000"
                )}
              </span>
              <span className="text-xl font-bold">
                {moimDetailData?.accBalance.toLocaleString()}원
              </span>
              <div className="flex items-center flex-grow w-32 h-32 rounded-xl mx-auto">
                <img src={`/images/moim/plane.png`} alt="plane" />
              </div>
              <HStack>
                <Button className="!w-1/2">출금</Button>
                <Button
                  className="!w-1/2"
                  onClick={() =>
                    navigateTo({
                      backgroundColor: "bg-gray-50",
                      page: <MoimDepositPage teamIdx={teamIdx} />,
                    })
                  }
                >
                  입금
                </Button>
              </HStack>
            </VStack>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            {moimDetailData?.preferTripIdx && preferTrip ? (
              <VStack
                key={preferTrip?.tripIdx}
                className="relative rounded-2xl bg-white shadowed m-2 mb-8 p-4 gap-4"
              >
                <span className="absolute right-4 text-xl text-yellow-300">
                  ★
                </span>
                <VStack className="items-start w-64 !gap-0">
                  <span className="font-bold text-xl line-clamp-2">
                    {preferTrip?.tripName}
                  </span>
                  <span className="text-gray-500">
                    {preferTrip?.countryNameKo} 탐방
                  </span>
                  <span className="text-gray-500 line-clamp-1">
                    {preferTrip?.tripContent}
                  </span>
                  <span className="text-gray-500 text-nowrap">
                    {preferTrip?.tripStartDay
                      ? getPeriod(preferTrip?.tripStartDay, preferTrip?.tripDay)
                      : `총 ${preferTrip?.tripDay}일`}{" "}
                    {preferTrip?.tripStartDay && (
                      <span className="text-yellow-500">
                        {getDaysRemaining(preferTrip.tripStartDay)}
                      </span>
                    )}
                  </span>
                </VStack>
                <VStack className="w-full">
                  {/* 목표금액 */}
                  {[
                    {
                      value: moimDetailData?.accBalance ?? 0,
                      label: "계좌 잔액",
                      textColor: "text-primary",
                      bgColor: "bg-primary",
                    },

                    {
                      value: preferTrip?.tripGoalAmount ?? 0,
                      label: "목표 금액",
                      textColor: "text-blue-400",
                      bgColor: "bg-blue-400",
                    },

                    {
                      value: preferTrip?.tripExpectedAmount ?? 0,
                      label: "예상 금액",
                      textColor: "text-red-400",
                      bgColor: "bg-red-400",
                    },
                  ].map(({ value, textColor, bgColor, label }) => {
                    const portion =
                      preferTrip?.tripGoalAmount !== 0
                        ? (value / preferTrip!.tripGoalAmount) * 100
                        : 0;
                    return (
                      <VStack key={uuid()} className="!gap-0">
                        <HStack className="w-full">
                          <span className={cn("font-bold", textColor)}>
                            {label}
                          </span>
                          <Spacer />
                          <span className={cn("font-bold", textColor)}>
                            {value.toLocaleString()}원
                          </span>
                        </HStack>
                        <HStack className="w-full items-center bg-gray-200 rounded-full h-4">
                          <HStack
                            className={cn(
                              "items-center justify-end h-4 rounded-full transition-all",
                              bgColor
                            )}
                            style={{
                              width: `${Math.max((value / amountGraphBase) * 100, 3)}%`,
                            }}
                          >
                            {value / amountGraphBase >= 0.15 && (
                              <span className="text-xs font-bold mr-1 text-white">{`${portion.toFixed(1)}%`}</span>
                            )}
                          </HStack>
                          {value / amountGraphBase < 0.15 && (
                            <span
                              className={cn("text-xs font-bold", textColor)}
                            >{`${portion.toFixed(1)}%`}</span>
                          )}
                        </HStack>
                      </VStack>
                    );
                  })}
                </VStack>
                <Button
                  className="w-full"
                  onClick={() =>
                    navigateTo({
                      page: <MoimTripDetailPage trip={preferTrip!} />,
                    })
                  }
                >
                  더보기
                </Button>
              </VStack>
            ) : (
              <VStack className="items-center justify-center gap-4 bg-white shadowed rounded-2xl h-64 m-2 mb-8">
                <span className="text-gray-500">
                  즐겨찾기한 여행일정이 없습니다.
                </span>
                <NavigationLink
                  to={{
                    backgroundColor: "bg-gray-50",
                    page: (
                      <MoimTripsMainPage
                        teamIdx={teamIdx}
                        currentBalance={
                          moimDetailData ? moimDetailData?.accBalance : 0
                        }
                      />
                    ),
                  }}
                >
                  <div className="!w-16 !h-16 !p-0 !bg-white border-dashed rounded-xl border border-gray-500 !text-gray-500 text-xl flex items-center justify-center">
                    +
                  </div>
                </NavigationLink>
              </VStack>
            )}
          </SwiperSlide>
        </Swiper>

        <span className="text-gray-500 text-right pr-4">
          모임카드 신청 | 이용내역
        </span>
        {/* 메뉴 타일 6개 */}
        <HStack className="justify-evenly my-4">
          <VStack>
            <NavigationLink
              to={{
                page: (
                  <MoimDuesMainPage
                    accIdx={accIdx}
                    teamIdx={teamIdx}
                    teamName={teamName}
                  />
                ),
              }}
              className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16"
            >
              <img
                className="h-12 w-12 p-1"
                src={`/images/moim/moim-menu-01.png`}
                alt="main-tab-01"
              />
            </NavigationLink>
            <span className="font-semibold text-center">회비관리</span>
          </VStack>
          <VStack>
            <NavigationLink
              to={{
                backgroundColor: "bg-gray-50",
                page: (
                  <MoimTripsMainPage
                    teamIdx={teamIdx}
                    currentBalance={moimDetailData?.accBalance ?? 0}
                  />
                ),
              }}
            >
              <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
                <img
                  className="h-12 w-12 p-1"
                  src={`/images/moim/moim-menu-02.png`}
                  alt="main-tab-02"
                />
              </button>
            </NavigationLink>
            <span className="font-semibold text-center">여행관리</span>
          </VStack>
          <VStack>
            <NavigationLink
              to={{
                backgroundColor: "bg-gray-50",
                page: (
                  <MoimMembersMainPage
                    teamIdx={teamIdx}
                    teamMemberStatus={teamMemberStatus}
                    teamMemberIdx={teamMemberIdx}
                  />
                ),
              }}
            >
              <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
                <Avatar
                  crown={teamMemberStatus == "총무"}
                  backgroundColor={
                    colorPacks[teamMemberIdx % colorPacks.length]
                      .backgroundColor
                  }
                  seed={teamMemberIdx}
                  eye="smile"
                />
              </button>
            </NavigationLink>
            <span className="font-semibold text-center">모임원</span>
          </VStack>
        </HStack>
        <HStack className="justify-evenly">
          <VStack>
            <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
              <img
                className="h-12 w-12 p-1"
                src={`/images/moim/moim-menu-04.png`}
                alt="main-tab-04"
              />
            </button>
            <span className="font-semibold text-center">잔액분배</span>
          </VStack>
          <VStack>
            <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
              <img
                className="h-12 w-12 p-1"
                src={`/images/moim/moim-menu-05.png`}
                alt="main-tab-05"
              />
            </button>
            <span className="font-semibold text-center">환율</span>
          </VStack>
          <VStack>
            <NavigationLink
              to={{
                backgroundColor: "bg-gray-50",
                page: <MoimManagementPage teamIdx={teamIdx} />,
              }}
            >
              <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
                <img
                  className="h-12 w-12 p-1"
                  src={`/images/moim/moim-menu-06.png`}
                  alt="main-tab-06"
                />
              </button>
            </NavigationLink>
            <span className="font-semibold text-center">설정</span>
          </VStack>
        </HStack>
      </VStack>
      <Modal
        xButton
        show={showNoticeEdit}
        onClose={() => setShowNoticeEdit(false)}
        backDrop
      >
        <VStack>
          <span className="text-center font-bold leading-none">공지 등록</span>
          <input
            className="m-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-600 transition-colors duration-300"
            placeholder="공지를 등록해 주세요."
            type="text"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
          />

          <Button className="w-full" onClick={() => handleNoticeRequest()}>
            확인
          </Button>
        </VStack>
      </Modal>
      <Loading
        show={moimDetailDataIsLoading}
        label="모임 서비스를 불러오는 중..."
      />
    </>
  );
}
export default MoimDetailPage;

function MegaPhone() {
  return (
    <div className="w-6 h-6 text-primary">
      <svg
        viewBox="0 0 48.00 48.00"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M34,6h-.6l-30,8.8A2,2,0,0,0,2,16.8v9a2.2,2.2,0,0,0,1.4,2l30,8.8H34a2,2,0,0,0,2-2V8A2,2,0,0,0,34,6ZM19.1,34.2,8.4,31l1.3,8.4A2.9,2.9,0,0,0,12.6,42h4.5a2.8,2.8,0,0,0,2.1-1,3.4,3.4,0,0,0,.8-2.6Z"></path>
        <path d="M40,15.3a1.5,1.5,0,0,0,.9-.2l4-2a2,2,0,0,0-1.8-3.6l-4,2a2,2,0,0,0-.9,2.7A2.1,2.1,0,0,0,40,15.3Z"></path>
        <path d="M44.9,29.6l-4-2a2.1,2.1,0,0,0-2.7.8,2,2,0,0,0,.9,2.7l4,2a1.5,1.5,0,0,0,.9.2,2.1,2.1,0,0,0,1.8-1.1A1.9,1.9,0,0,0,44.9,29.6Z"></path>
        <path d="M40,23.3h4a2,2,0,0,0,0-4H40a2,2,0,0,0,0,4Z"></path>
      </svg>
    </div>
  );
}
