import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
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
import TripImage from "../../components/trip/TripImg.tsx";
import cn from "../../utils/cn.ts";

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
  preferTripIdx,
}: MoimDetailPageProps) {
  const [notice, setNotice] = useState<string>("");
  const [showNoticeEdit, setShowNoticeEdit] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

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

  const { data: preferTrip, isLoading: preferTripIsLoading } = useFetch<
    null,
    TripResDto
  >(TripsGetURL(preferTripIdx), "GET");

  const { trigger } = useFetchTrigger<UpdateTeamNoticeReq, void>(
    NoticePutURL(),
    "PUT"
  );

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

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
          <SwiperSlide className="!h-fit">
            <VStack className="!gap-0 bg-white shadowed rounded-2xl h-64 m-2 mb-8 p-4">
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
              {/* Todo: 외화 잔액 설정 */}
              <span className="text-xl font-bold text-indigo-500">99.99$</span>
              <span className="text-xl font-bold text-orange-500">4,000¥</span>
              <Spacer />
              {/* TODO: 비행기 아이콘 */}
              <HStack>
                <Button className="!w-1/2">출금</Button>
                <NavigationLink
                  className="w-1/2"
                  to={{
                    backgroundColor: "bg-gray-50",
                    page: <MoimDepositPage teamIdx={teamIdx} />,
                  }}
                >
                  <Button className="!w-full">입금</Button>
                </NavigationLink>
              </HStack>
            </VStack>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            {preferTripIsLoading ? (
              <span>Loading...</span>
            ) : moimDetailData?.preferTripIdx ? (
              <VStack
                key={preferTrip?.tripIdx}
                className="rounded-2xl w-full bg-white shadowed px-6 py-4 mb-4"
              >
                <HStack className="w-full justify-between overflow-hidden overflow-ellipsis">
                  <VStack className="items-start w-64">
                    <span className="font-bold text-xl">
                      {preferTrip?.tripName}
                    </span>
                    <span className="text-gray-500">
                      {preferTrip?.countryNameKo} 탐방
                    </span>
                    <span className="text-gray-500 !text-wrap">
                      {preferTrip?.tripContent}
                    </span>
                    <span className="text-gray-500">
                      {preferTrip?.tripStartDay
                        ? getPeriod(
                            preferTrip?.tripStartDay,
                            preferTrip?.tripDay
                          )
                        : `총 ${preferTrip?.tripDay}일`}
                    </span>
                    {preferTrip?.tripStartDay && (
                      <span className="text-yellow-500 mb-6">
                        {getDaysRemaining(preferTrip.tripStartDay)}
                      </span>
                    )}
                  </VStack>
                </HStack>

                <VStack className="w-full mb-2">
                  <HStack>
                    <span className="text-primary font-bold">
                      {moimDetailData?.accBalance.toLocaleString()}₩
                    </span>
                    <span className="text-primary font-bold">
                      / {preferTrip!.tripGoalAmount.toLocaleString()}₩ (
                      {preferTrip!.tripGoalAmount !== 0
                        ? `${((moimDetailData?.accBalance / preferTrip!.tripGoalAmount) * 100).toFixed(2)}%`
                        : "0.00%"}
                      )
                    </span>
                  </HStack>
                  <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                    <div
                      className="bg-primary h-4 rounded-full"
                      style={{
                        width: `${
                          preferTrip!.tripGoalAmount !== 0
                            ? (moimDetailData?.accBalance /
                                preferTrip!.tripGoalAmount) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </VStack>

                <NavigationLink
                  className="w-full"
                  to={{ page: <MoimTripDetailPage trip={preferTrip!} /> }}
                >
                  <Button className="w-full">더보기</Button>
                </NavigationLink>
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
                  <Button className="!w-16 !h-16 !p-0 !bg-white border-dashed rounded-xl border border-gray-500 !text-gray-500 text-xl">
                    +
                  </Button>
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
