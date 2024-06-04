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
import { DetailTeamReqDto } from "../../types/team/TeamRequestDto";
import { useFetch } from "../../hooks/useFetch";
import { DetailTeamResDto } from "../../types/team/TeamResponseDto";
import { MoimDetailPostURL } from "../../utils/urlFactory";
import formatAccNo from "../../utils/formatAccNo";
import Loading from "../../components/common/Modals/Loading";

interface MoimDetailPageProps {
  teamIdx: number;
  accIdx: number;
  teamName: string;
  teamMemberIdx: number;
}

function MoimDetailPage({
  accIdx,
  teamIdx,
  teamName,
  teamMemberIdx,
}: MoimDetailPageProps) {
  const [notice, setNotice] = useState<string>("");
  const [showNoticeEdit, setShowNoticeEdit] = useState(false);

  // 모임서비스 상세 데이터 불러오기
  const requestData: DetailTeamReqDto = {
    teamIdx: teamIdx,
    teamMemberIdx: teamMemberIdx,
  };

  const { data: moimDetailData, isLoading: moimDetailDataIsLoading } = useFetch<
    DetailTeamReqDto,
    DetailTeamResDto
  >(MoimDetailPostURL(), "POST", requestData);

  useEffect(() => {
    if (!moimDetailData) return;
  }, [moimDetailData]);

  return (
    <>
      <VStack className="min-h-full bg-gray-50">
        <NavigationBar title={"모임서비스"} />
        {/* 공지사항 */}
        <div className="w-full py-4 px-6">
          <Button
            className="w-full !bg-gray-200 !text-black text-left !rounded-2xl py-3"
            onClick={() => setShowNoticeEdit(true)}
          >
            {moimDetailData?.teamNotice == null
              ? "공지를 등록해 주세요."
              : moimDetailData?.teamNotice}
          </Button>
        </div>
        {/* 모임 요약 카드 + 즐겨찾기한 여행 */}
        <Swiper className="w-full" slidesPerView={1.1} centeredSlides>
          <SwiperSlide className="!h-fit">
            <VStack className="!gap-0 bg-white shadowed rounded-2xl h-64 m-2 mb-8 p-4">
              <HStack className="items-center">
                <Avatar crown />
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
                    page: <MoimDepositPage />,
                  }}
                >
                  <Button className="!w-full">입금</Button>
                </NavigationLink>
              </HStack>
            </VStack>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            <VStack className="items-center justify-center gap-4 bg-white shadowed rounded-2xl h-64 m-2 mb-8">
              <span className="text-gray-500">
                즐겨찾기한 여행일정이 없습니다.
              </span>
              <NavigationLink
                to={{
                  backgroundColor: "bg-gray-50",
                  page: <MoimTripsMainPage teamIdx={0} currentBalance={0} />,
                }}
              >
                <Button className="!w-16 !h-16 !p-0 !bg-white border-dashed rounded-xl border border-gray-500 !text-gray-500 text-xl">
                  +
                </Button>
              </NavigationLink>
            </VStack>
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
                page: <MoimMembersMainPage teamIdx={teamIdx} />,
              }}
            >
              <button className="bg-gray-100 flex items-center justify-center shadowed rounded-xl w-16 h-16">
                <Avatar backgroundColor="bg-indigo-300" skinColor="white" />
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
            className="m-2"
            placeholder="공지를 등록해 주세요."
            type="text"
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
          />

          <Button className="w-full" onClick={() => setShowNoticeEdit(false)}>
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
