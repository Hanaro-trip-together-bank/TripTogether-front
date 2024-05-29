import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { VStack, HStack } from "../../components/common/Stack";
import NavigationLink from "../../components/common/Navigation/NavigationLink";
import { Scrollbar } from "swiper/modules";
import { currentTime2 } from "../../utils/currentTime";
import { useState } from "react";
import Arrow from "../../components/common/Arrow";
import LoginPage from "./LoginPage";
import MoimServiceMainPage from "../MoimService/MoimServiceMainPage";
function MainPage() {
  const [login, setLogin] = useState<boolean>(false);
  return (
    <VStack className="!gap-0 bg-gradient-to-b from-[#e3e7e9] to-[#ffffff] min-h-full pt-4">
      {/* 상단 바로가기메뉴 (이름, 원큐지갑, QR, 알림) */}
      <VStack className="px-6">
        <HStack className="w-full">
          <div className="text-2xl font-bold underline-offset-4 mr-1">
            {login ? (
              <span className="underline">최지웅</span>
            ) : (
              <NavigationLink
                to={{
                  backgroundColor: "bg-secondary",
                  page: <LoginPage onLoginDone={() => setLogin(true)} />,
                }}
              >
                <span className="underline"> 로그인</span>
              </NavigationLink>
            )}
          </div>
          {login && (
            <div className="border border-black rounded-full px-2 font-bold text-center py-0.5">
              전체계좌
            </div>
          )}
        </HStack>
        <HStack className="items-center !gap-0">
          <span className="text-gray-600">
            {login
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
            <div className="bg-white shadowed rounded-lg m-4 mb-8">
              {login ? (
                <VStack className="w-full items-center p-4">
                  <span className="text-sm">하나은행 ATM 수수료 0원</span>
                  <span className="text-xl font-bold">모바일 전용통장</span>
                  <img
                    className="h-24"
                    src={`/images/main/account.png`}
                    alt="account"
                  />
                  <div className="border-b w-full border-gray-200" />
                  <NavigationLink to={{ page: <MainPage /> }}>
                    <div className="m-2 text-primary font-bold">가입하기</div>
                  </NavigationLink>
                </VStack>
              ) : (
                <VStack className="w-full items-center p-4">
                  <span className="text-sm">로그인하고 안전하게</span>
                  <span className="text-xl font-bold">잔액을 조회하세요</span>
                  <img
                    className="h-24"
                    src={`/images/main/account.png`}
                    alt="account"
                  />
                  <div className="border-b w-full border-gray-200" />

                  <NavigationLink
                    to={{
                      backgroundColor: "bg-secondary",
                      page: <LoginPage onLoginDone={() => setLogin(true)} />,
                    }}
                  >
                    <div className="m-2 text-primary font-bold">로그인</div>
                  </NavigationLink>
                </VStack>
              )}
            </div>
          </SwiperSlide>
          <SwiperSlide className="!h-fit">
            <div className="bg-white shadowed rounded-lg m-4 mb-8">
              <VStack className="w-full items-center p-4">
                <span className="text-sm">알아서 관리해 주는</span>
                <span className="text-xl font-bold">모임통장 서비스</span>
                <img
                  className="h-24"
                  src={`/images/main/moim.png`}
                  alt="moim"
                />
                <div className="border-b w-full border-gray-200" />
                <NavigationLink to={{ page: <MoimServiceMainPage /> }}>
                  <div className="m-2 text-primary font-bold">
                    모임 조회하기
                  </div>
                </NavigationLink>
              </VStack>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* 메뉴 타일 6개 */}
      <HStack className="justify-evenly my-4">
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-01.png`}
              alt="main-menu-01"
            />
          </button>
          <span className="font-semibold text-center">전체계좌</span>
        </VStack>
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-02.png`}
              alt="main-menu-02"
            />
          </button>
          <span className="font-semibold text-center">영하나</span>
        </VStack>
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-03.png`}
              alt="main-menu-03"
            />
          </button>
          <span className="font-semibold text-center">이벤트</span>
        </VStack>
      </HStack>
      <HStack className="justify-evenly">
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-04.png`}
              alt="main-menu-04"
            />
          </button>
          <span className="font-semibold text-center">주식추천</span>
        </VStack>
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-05.png`}
              alt="main-menu-05"
            />
          </button>
          <span className="font-semibold text-center">펀드</span>
        </VStack>
        <VStack>
          <button className="bg-gray-100 shadowed rounded-xl w-16 h-16">
            <img
              className="h-12 w-12 mx-auto"
              src={`/images/main/main-menu-06.png`}
              alt="main-menu-06"
            />
          </button>
          <span className="font-semibold text-center">맞춤설정</span>
        </VStack>
      </HStack>
      {/* 카드 리스트 */}
      <VStack className="w-full p-4 gap-4">
        {/* 카드 1 */}
        <VStack className="rounded-2xl w-full bg-indigo-500 px-6 py-4">
          <HStack className="text-gray-200 justify-between">
            <span>하나은행 자산</span>
            {login && <span className="text-sm">{currentTime2()}</span>}
          </HStack>
          <HStack className="gap-0 items-end mb-2">
            <span className="text-3xl text-white font-bold">
              {login ? +0 : "???"}
            </span>
            <span className="text-lg text-white font-bold"> 원 </span>
          </HStack>
          {!login && (
            <span className="text-white mb-2">로그인하고 확인해 보세요 👀</span>
          )}
          <HStack className="font-bold text-white justify-evenly items-center border-t pt-4 border-indigo-200">
            <button className="">투자관리</button>
            <span className="text-indigo-200">|</span>
            <button className="">대출케어</button>
            <span className="text-indigo-200">|</span>
            <button className="">연금관리</button>
          </HStack>
        </VStack>
        {/* 카드 2 */}
        <VStack className="rounded-2xl h-32 w-full bg-sky-500 px-6 py-4" />
        {/* 카드 3 */}
        <VStack className="rounded-2xl h-32 w-full bg-emerald-400 px-6 py-4" />
        {/* 카드 4 */}
        <VStack className="rounded-2xl h-32 w-full bg-orange-400 px-6 py-4" />
      </VStack>
      {/* 하단 탭바 */}
      <HStack className="absolute bottom-0 w-full h-24 bg-white/50  backdrop-blur-sm">
        <VStack className="text-primary font-bold items-center flex-grow border-t-2 border-primary">
          <img
            className="h-12 w-12 opacity-80 p-1"
            src={`/images/main/main-tab-01.png`}
            alt="main-tab-01"
          />
          <span> 홈 </span>
        </VStack>
        <VStack className="text-primary-disabled font-bold items-center flex-grow">
          <img
            className="h-12 w-12 opacity-80 p-1"
            src={`/images/main/main-tab-02.png`}
            alt="main-tab-02"
          />
          <span> 상품 </span>
        </VStack>
        <VStack className="text-primary-disabled font-bold items-center flex-grow">
          <img
            className="h-12 w-12 opacity-80 p-1"
            src={`/images/main/main-tab-03.png`}
            alt="main-tab-03"
          />
          <span> 자산 </span>
        </VStack>
        <VStack className="text-primary-disabled font-bold items-center flex-grow">
          <img
            className="h-12 w-12 opacity-80 p-1"
            src={`/images/main/main-tab-04.png`}
            alt="main-tab-04"
          />
          <span> 결제 </span>
        </VStack>
        <VStack className="text-primary-disabled font-bold items-center flex-grow">
          <img
            className="h-12 w-12 opacity-80 p-1"
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
