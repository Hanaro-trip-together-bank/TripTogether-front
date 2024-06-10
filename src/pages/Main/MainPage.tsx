/* eslint-disable react-hooks/exhaustive-deps */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { VStack, HStack } from "../../components/common/Stack";
import NavigationLink from "../../components/common/Navigation/NavigationLink";
import { Scrollbar } from "swiper/modules";
import { currentTime2 } from "../../utils/currentTime";
import Arrow from "../../components/common/Arrow";
import LoginPage from "./LoginPage";
import MoimServiceMainPage from "../MoimService/MoimServiceMainPage";
import { useAuth } from "../../contexts/useAuth";
import { requestPermission } from "../../firebaseConfig";
import { useNavigation } from "../../contexts/useNavigation";
import { useEffect } from "react";
import MoimInvitationPage from "../MoimService/SignUp/MoimInvitationPage";

function MainPage() {
  const { member } = useAuth();
  const { setPath } = useNavigation();
  requestPermission();
  //[하나은행] 이채원님이 등산 동호회에 초대했어요. http://localhost:5173/invite?inviter=이채원&teamNo=2
  useEffect(() => {
    // 현재 URL의 쿼리 스트링을 가져옵니다.
    const queryString = window.location.search;
    // URLSearchParams 객체를 사용하여 쿼리 파라미터를 추출합니다.
    const params = new URLSearchParams(queryString);
    const inviterParam = params.get("inviter");
    const teamNoParam = params.get("teamNo");
    if (inviterParam && teamNoParam)
      setPath([
        { backgroundColor: "bg-[#e3e7e9]", page: <MainPage /> },
        {
          page: (
            <MoimInvitationPage inviter={inviterParam} teamIdx={+teamNoParam} />
          ),
        },
      ]);
  }, []);
  return (
    <VStack className="!gap-0 bg-gradient-to-b from-[#e3e7e9] to-[#ffffff] h-full pt-4 overflow-y-auto">
      {/* 상단 바로가기메뉴 (이름, 원큐지갑, QR, 알림) */}
      <VStack className="px-6">
        <HStack className="w-full">
          <div className="mr-1 text-2xl font-bold underline-offset-4">
            {member.memberName ? (
              <span className="underline">{member.memberName}</span>
            ) : (
              <NavigationLink
                to={{
                  backgroundColor: "bg-secondary",
                  page: <LoginPage />,
                }}
              >
                <span className="underline"> 로그인</span>
              </NavigationLink>
            )}
          </div>
          {member.memberName && (
            <div className="border border-black rounded-full px-2 font-bold text-center py-0.5">
              전체계좌
            </div>
          )}
        </HStack>
        <HStack className="items-center !gap-0">
          <span className="text-gray-600">
            {member.memberName
              ? "청년내일저축계좌 간편자격조회"
              : "첫 급여손님께 달달한 혜택을🍯"}
          </span>
          <Arrow direction="right" />
        </HStack>
      </VStack>
      {/* 메인 타일 큰거 */}
      <div>
        <Swiper
          className="w-full"
          slidesPerView={1.25}
          centeredSlides
          scrollbar
          modules={[Scrollbar]}
        >
          <SwiperSlide className="!h-fit">
            <div className="m-4 mb-8 bg-white rounded-lg shadowed">
              {member.memberName ? (
                <VStack className="items-center w-full p-4">
                  <span className="text-sm">하나은행 ATM 수수료 0원</span>
                  <span className="text-xl font-bold">모바일 전용통장</span>
                  <img
                    className="h-24"
                    src={`/images/main/account.png`}
                    alt="account"
                  />
                  <div className="w-full border-b border-gray-200" />
                  <NavigationLink to={{ page: <MainPage /> }}>
                    <div className="m-2 font-bold text-primary">가입하기</div>
                  </NavigationLink>
                </VStack>
              ) : (
                <VStack className="items-center w-full p-4">
                  <span className="text-sm">로그인하고 안전하게</span>
                  <span className="text-xl font-bold">잔액을 조회하세요</span>
                  <img
                    className="h-24"
                    src={`/images/main/account.png`}
                    alt="account"
                  />
                  <div className="w-full border-b border-gray-200" />

                  <NavigationLink
                    to={{
                      backgroundColor: "bg-secondary",
                      page: <LoginPage />,
                    }}
                  >
                    <div className="m-2 font-bold text-primary">로그인</div>
                  </NavigationLink>
                </VStack>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            <div className="m-4 mb-8 bg-white rounded-lg shadowed">
              <VStack className="items-center w-full p-4">
                <span className="text-sm">알아서 관리해 주는</span>
                <span className="text-xl font-bold">모임통장 서비스</span>
                <img
                  className="h-24"
                  src={`/images/main/moim.png`}
                  alt="moim"
                />
                <div className="w-full border-b border-gray-200" />
                {member.memberName ? (
                  <NavigationLink
                    to={{
                      backgroundColor: "bg-gray-50",
                      page: (
                        <MoimServiceMainPage memberIdx={member.memberIdx} />
                      ),
                    }}
                  >
                    <div className="m-2 font-bold text-primary">
                      모임 조회하기
                    </div>
                  </NavigationLink>
                ) : (
                  <NavigationLink
                    to={{
                      backgroundColor: "bg-secondary",
                      page: <LoginPage />,
                    }}
                  >
                    <div className="m-2 font-bold text-primary">로그인</div>
                  </NavigationLink>
                )}
              </VStack>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* 메뉴 타일 6개 */}
      <HStack className="my-4 justify-evenly">
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-01.png`}
              alt="main-menu-01"
            />
          </button>
          <span className="font-semibold text-center">전체계좌</span>
        </VStack>
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-02.png`}
              alt="main-menu-02"
            />
          </button>
          <span className="font-semibold text-center">영하나</span>
        </VStack>
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-03.png`}
              alt="main-menu-03"
            />
          </button>
          <span className="font-semibold text-center">이벤트</span>
        </VStack>
      </HStack>
      <HStack className="justify-evenly">
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-04.png`}
              alt="main-menu-04"
            />
          </button>
          <span className="font-semibold text-center">주식추천</span>
        </VStack>
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-05.png`}
              alt="main-menu-05"
            />
          </button>
          <span className="font-semibold text-center">펀드</span>
        </VStack>
        <VStack>
          <button className="w-16 h-16 bg-gray-100 shadowed rounded-xl">
            <img
              className="w-12 h-12 mx-auto"
              src={`/images/main/main-menu-06.png`}
              alt="main-menu-06"
            />
          </button>
          <span className="font-semibold text-center">맞춤설정</span>
        </VStack>
      </HStack>
      {/* 카드 리스트 */}
      <VStack className="w-full gap-4 p-4">
        {/* 카드 1 */}
        <VStack className="w-full px-6 py-4 bg-indigo-500 rounded-2xl">
          <HStack className="justify-between text-gray-200">
            <span>하나은행 자산</span>
            {member.memberName && (
              <span className="text-sm">{currentTime2()}</span>
            )}
          </HStack>
          <HStack className="items-end gap-0 mb-2">
            <span className="text-3xl font-bold text-white">
              {member.memberName ? +0 : "???"}
            </span>
            <span className="text-lg font-bold text-white"> 원 </span>
          </HStack>
          {!member.memberName && (
            <span className="mb-2 text-white">로그인하고 확인해 보세요 👀</span>
          )}
          <HStack className="items-center pt-4 font-bold text-white border-t border-indigo-200 justify-evenly">
            <button className="">투자관리</button>
            <span className="text-indigo-200">|</span>
            <button className="">대출케어</button>
            <span className="text-indigo-200">|</span>
            <button className="">연금관리</button>
          </HStack>
        </VStack>
        {/* 카드 2 */}
        <VStack className="w-full h-32 px-6 py-4 rounded-2xl bg-sky-500" />
        {/* 카드 3 */}
        <VStack className="w-full h-32 px-6 py-4 rounded-2xl bg-emerald-400" />
        {/* 카드 4 */}
        <VStack className="w-full h-32 px-6 py-4 bg-orange-400 rounded-2xl" />
      </VStack>
      {/* 하단 탭바 */}
      <HStack className="absolute bottom-0 w-full h-24 bg-white/50 backdrop-blur-sm">
        <VStack className="items-center flex-grow font-bold border-t-2 text-primary border-primary">
          <img
            className="w-12 h-12 p-1 opacity-80"
            src={`/images/main/main-tab-01.png`}
            alt="main-tab-01"
          />
          <span> 홈 </span>
        </VStack>
        <VStack className="items-center flex-grow font-bold text-primary-disabled">
          <img
            className="w-12 h-12 p-1 opacity-80"
            src={`/images/main/main-tab-02.png`}
            alt="main-tab-02"
          />
          <span> 상품 </span>
        </VStack>
        <VStack className="items-center flex-grow font-bold text-primary-disabled">
          <img
            className="w-12 h-12 p-1 opacity-80"
            src={`/images/main/main-tab-03.png`}
            alt="main-tab-03"
          />
          <span> 자산 </span>
        </VStack>
        <VStack className="items-center flex-grow font-bold text-primary-disabled">
          <img
            className="w-12 h-12 p-1 opacity-80"
            src={`/images/main/main-tab-04.png`}
            alt="main-tab-04"
          />
          <span> 결제 </span>
        </VStack>
        <VStack className="items-center flex-grow font-bold text-primary-disabled">
          <img
            className="w-12 h-12 p-1 opacity-80"
            src={`/images/main/main-tab-05.png`}
            alt="main-tab-05"
          />
          <span> 메뉴 </span>
        </VStack>
      </HStack>
    </VStack>
  );
}
export default MainPage;
