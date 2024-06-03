import { useState } from "react";
import Arrow from "../../../components/common/Arrow";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Toggle from "../../../components/common/Toggle";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import useToggle from "../../../hooks/useToggle";
import cn from "../../../utils/cn";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import MoimScheduleEditPage from "./MoimScheduleEditPage";
import Avatar from "../../../components/common/Avatar";
import TextArea from "../../../components/common/TextArea";

interface MoimTripDetailPageProps {}

function MoimTripDetailPage({}: MoimTripDetailPageProps) {
  const [isEditMode, toggleIsEditMode] = useToggle();
  const [showEditConfirm, toggleShowEditConfirm] = useToggle();
  const [showScheduleDetail, toggleShowScheduleDetail] = useToggle();
  const toggleEditWithCheck = () => {
    if (!isEditMode) {
      toggleIsEditMode();
    } else {
      toggleShowEditConfirm();
    }
  };

  return (
    <>
      <VStack className="h-full">
        <NavigationBar title={"여행관리"} />
        <HStack className="justify-end px-6">
          <Toggle
            onClick={toggleEditWithCheck}
            selected={isEditMode}
            label="수정 "
          />
        </HStack>
        {/* 여행 계획 컨테이너 */}
        <VStack className="h-full overflow-y-scroll px-8 py-6">
          {/* 1일차 */}
          <VStack className="border-l-4 w-full h-fit pb-4 border-indigo-400 gap-6">
            <HStack className="relative items-center px-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center border-indigo-400 bg-white">
                <span className="text-indigo-400 text-xl font-extrabold text-center">
                  1
                </span>
              </VStack>
              <span className="w-full text-center text-xl font-bold underline underline-offset-4">
                1일차
              </span>
              <Spacer />
              <span className="absolute text-gray-500 right-0">07.16(수)</span>
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 있는 일정 */}
            <button onClick={toggleShowScheduleDetail}>
              <HStack className="relative items-center pl-6">
                {/* 평소엔 장소 있다면 이미지, 없다면 작은 점, 수정모드에선 위치조정기 */}

                <VStack
                  className={cn(
                    "absolute -inset-x-0.5 -translate-x-1/2 w-8 h-16 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden transition-all z-10",
                    isEditMode
                      ? "opacity-100"
                      : "scale-y-50 opacity-0 pointer-events-none"
                  )}
                >
                  <button>
                    <Arrow
                      strokeWidth={16}
                      className="text-indigo-400"
                      direction="up"
                    />
                  </button>
                  <button>
                    <Arrow
                      strokeWidth={16}
                      className="text-indigo-400"
                      direction="down"
                    />
                  </button>
                </VStack>

                <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-8 h-8 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden">
                  <img
                    src="https://velog.velcdn.com/images/planic324/profile/e5038e08-c4d1-4135-8a77-c9d38344ea9f/image.JPG"
                    alt=""
                  />
                </VStack>

                <VStack className="leading-none items-start text-start font-bold !gap-0">
                  {/* 제목, 두줄 넘어가면 '...' 처리 */}
                  <span className="text-lg leading-tight line-clamp-2">
                    유니버셜 스튜디오 재팬 (ユニバーサル・スタジオ・ジャパン)
                  </span>
                  {/* 메모, 두줄 넘어가면 '...' 처리 */}
                  <span className="text-gray-500 text-sm line-clamp-2">
                    오사카의 테마파크
                  </span>
                  <span className="text-gray-500 text-sm">30,000¥</span>
                </VStack>
                <Spacer />
                {isEditMode ? (
                  <HStack className="text-nowrap">
                    <NavigationLink to={{ page: <MoimScheduleEditPage /> }}>
                      수정
                    </NavigationLink>
                    <span className="text-red-500">삭제</span>
                  </HStack>
                ) : (
                  <HStack>
                    <SpeechBubble />
                    <span> 2</span>
                    <Arrow direction="right" />
                  </HStack>
                )}
              </HStack>
            </button>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  숙소로 이동
                </span>
                <span className="text-gray-500">30,000¥</span>
                {/* 메모, 두줄 넘어가면 '...' 처리 */}
                <span className="text-gray-500 text-sm line-clamp-2">
                  오사카의 테마파크
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <SpeechBubble />
                  <span> 2</span>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  씻고자기
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
          </VStack>

          {/* 2일차 */}
          <VStack className="border-l-4 w-full h-fit pb-4 border-pink-300 gap-6">
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center border-pink-300 bg-white">
                <span className="text-pink-300 text-xl font-extrabold text-center">
                  2
                </span>
              </VStack>
              <span className="w-full text-center text-xl font-bold underline underline-offset-4 pr-6">
                2일차
              </span>
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 있는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-8 h-8 rounded-full border-4 items-center justify-center border-pink-300 bg-white overflow-hidden">
                <img
                  src="https://velog.velcdn.com/images/planic324/profile/e5038e08-c4d1-4135-8a77-c9d38344ea9f/image.JPG"
                  alt=""
                />
              </VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  유니버셜 스튜디오 재팬 (ユニバーサル・スタジオ・ジャパン)
                </span>
                <span className="text-gray-500">30,000¥</span>
                {/* 메모, 두줄 넘어가면 '...' 처리 */}
                <span className="text-gray-500 text-sm line-clamp-2">
                  오사카의 테마파크
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <SpeechBubble />
                  <span> 2</span>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-pink-300 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  숙소로 이동
                </span>
                <span className="text-gray-500">30,000¥</span>
                {/* 메모, 두줄 넘어가면 '...' 처리 */}
                <span className="text-gray-500 text-sm line-clamp-2">
                  오사카의 테마파크
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <SpeechBubble />
                  <span> 2</span>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-pink-300 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  씻고자기
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
          </VStack>

          {/* 3일차 */}
          <VStack className="border-l-4 w-full h-fit pb-4 border-indigo-400 gap-6">
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center border-indigo-400 bg-white">
                <span className="text-indigo-400 text-xl font-extrabold text-center">
                  3
                </span>
              </VStack>
              <span className="w-full text-center text-xl font-bold underline underline-offset-4 pr-6">
                3일차
              </span>
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 있는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-8 h-8 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden">
                <img
                  src="https://velog.velcdn.com/images/planic324/profile/e5038e08-c4d1-4135-8a77-c9d38344ea9f/image.JPG"
                  alt=""
                />
              </VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  유니버셜 스튜디오 재팬 (ユニバーサル・スタジオ・ジャパン)
                </span>
                <span className="text-gray-500">30,000¥</span>
                {/* 메모, 두줄 넘어가면 '...' 처리 */}
                <span className="text-gray-500 text-sm line-clamp-2">
                  오사카의 테마파크
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <SpeechBubble />
                  <span> 2</span>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  숙소로 이동
                </span>
                <span className="text-gray-500">30,000¥</span>
                {/* 메모, 두줄 넘어가면 '...' 처리 */}
                <span className="text-gray-500 text-sm line-clamp-2">
                  오사카의 테마파크
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <SpeechBubble />
                  <span> 2</span>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
            {/* 장소 없는 일정 */}
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center border-indigo-400 bg-white overflow-hidden"></VStack>
              <VStack className="leading-none font-bold !gap-0">
                {/* 제목, 두줄 넘어가면 '...' 처리 */}
                <span className="text-lg leading-tight line-clamp-2">
                  씻고자기
                </span>
              </VStack>
              <Spacer />
              {isEditMode ? (
                <span className="text-nowrap">
                  수정 <span className="text-red-500">삭제</span>
                </span>
              ) : (
                <HStack>
                  <Arrow direction="right" />
                </HStack>
              )}
            </HStack>
            {/* 평소엔 구분선, 설정모드에선 +버튼 */}
            <VStack
              className={cn(
                "relative border-b ml-4 border-gray-200 transition-all items-center justify-center",
                isEditMode ? "h-0" : "h-0"
              )}
            >
              <button
                className={cn(
                  "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 border-gray-400 text-gray-400 mx-auto transition-all",
                  isEditMode ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
              >
                +
              </button>
            </VStack>
          </VStack>

          {/* 끝 */}
          <VStack className="border-l-4 w-full mt-4 pb-4 border-red-400 gap-6">
            <HStack className="relative items-center pl-6">
              <VStack className="absolute -inset-x-0.5 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center border-red-400 text-red-400 bg-white p-1">
                <Goal />
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
      {/* 수정  확인 모달 */}
      <Modal
        backDrop
        xButton
        show={showEditConfirm}
        onClose={toggleShowEditConfirm}
      >
        <VStack className="w-72 items-center text-center gap-8">
          <span>변경사항을 적용할까요?</span>
          <HStack className="w-full">
            <Button
              className="!w-1/3"
              gray
              roundedFull
              onClick={toggleShowEditConfirm}
            >
              취소
            </Button>
            <Button
              className="!bg-red-400 !px-0 !w-1/3"
              roundedFull
              onClick={() => {
                toggleIsEditMode();
                toggleShowEditConfirm();
              }}
            >
              버리기
            </Button>
            <Button
              className="!w-1/3"
              roundedFull
              onClick={() => {
                toggleIsEditMode();
                toggleShowEditConfirm();
              }}
            >
              적용
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 여행 상세 모달 */}
      <Modal
        backDrop
        xButton
        modalType="sheet"
        show={showScheduleDetail}
        onClose={toggleShowScheduleDetail}
      >
        <img
          className="absolute inset-0 w-full rounded-t-3xl -z-10 h-32 object-cover"
          src="https://velog.velcdn.com/images/planic324/profile/e5038e08-c4d1-4135-8a77-c9d38344ea9f/image.JPG"
          alt=""
        />
        <HStack className="mt-32">
          <VStack className="leading-none font-bold !gap-0">
            {/* 제목, 두줄 넘어가면 '...' 처리 */}
            <span className="text-lg leading-tight">
              유니버셜 스튜디오 재팬 (ユニバーサル・スタジオ・ジャパン)
            </span>
            <span className="text-gray-500">30,000¥</span>
            {/* 메모, 두줄 넘어가면 '...' 처리 */}
            <span className="text-gray-500 text-sm">오사카의 테마파크</span>
          </VStack>
        </HStack>
        <HStack className="justify-end items-center mb-2 pb-2 border-b border-gray-200">
          <span>댓글</span>
          <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
            3
          </span>
        </HStack>
        <VStack className="max-h-64 overflow-y-scroll">
          {/* 댓글 1 */}
          <HStack className="gap-2 mb-2 pb-2 border-b border-gray-200">
            <Avatar />
            <VStack className="!gap-0">
              <span>
                <span className="font-bold">최지웅</span>
                <span className="text-sm text-gray-500"> 05.31 13:46</span>
              </span>
              <span className="">비밀 댓글입니다. </span>
            </VStack>
            <Spacer />
            <span className="text-nowrap text-blue-500">수정</span>
            <span className="text-nowrap text-red-500">삭제</span>
          </HStack>
          {/* 댓글 2 */}
          <HStack className="gap-2 mb-2 pb-2 border-b border-gray-200">
            <Avatar />
            <VStack className="!gap-0">
              <span>
                <span className="font-bold">최지웅</span>
                <span className="text-sm text-gray-500"> 05.31 13:46</span>
              </span>
              <span className="">비밀 댓글입니다. </span>
            </VStack>
            <Spacer />
            <span className="text-nowrap text-blue-500">수정</span>
            <span className="text-nowrap text-red-500">삭제</span>
          </HStack>
          {/* 댓글 3 */}
          <HStack className="gap-2 mb-2 pb-2 border-b border-gray-200">
            <Avatar />
            <VStack className="!gap-0">
              <span>
                <span className="font-bold">최지웅</span>
                <span className="text-sm text-gray-500"> 05.31 13:46</span>
              </span>
              <span className="">비밀 댓글입니다. </span>
            </VStack>
            <Spacer />
            <span className="text-nowrap text-blue-500">수정</span>
            <span className="text-nowrap text-red-500">삭제</span>
          </HStack>
        </VStack>
        <HStack className="gap-2 mt-2">
          <TextArea className="w-full" border></TextArea>
          <button className="text-nowrap text-center">등록</button>
        </HStack>
      </Modal>
    </>
  );
}
export default MoimTripDetailPage;

function SpeechBubble() {
  return (
    <svg
      fill="#000000"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 67.428 67.428"
    >
      <path d="M33.468,67.183C15.013,67.183,0,52.169,0,33.714S15.014,0.245,33.468,0.245c18.455,0,33.469,15.014,33.469,33.469 c0,5.622-1.421,11.162-4.117,16.076l4.608,17.2l-16.849-4.516C45.408,65.557,39.512,67.183,33.468,67.183z M33.468,4.245 C17.219,4.245,4,17.465,4,33.714s13.219,29.469,29.468,29.469c5.582,0,11.021-1.574,15.729-4.554l0.74-0.469l11.835,3.172 l-3.243-12.1l0.419-0.72c2.609-4.483,3.989-9.601,3.989-14.799C62.937,17.465,49.717,4.245,33.468,4.245z"></path>
      <circle cx="50.623" cy="33.714" r="4.206"></circle>
      <circle cx="33.469" cy="33.714" r="4.207"></circle>
      <circle cx="16.313" cy="33.714" r="4.206"></circle>
    </svg>
  );
}

function Goal() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.75 1C6.16421 1 6.5 1.33579 6.5 1.75V3.6L8.22067 3.25587C9.8712 2.92576 11.5821 3.08284 13.1449 3.70797L13.3486 3.78943C14.9097 4.41389 16.628 4.53051 18.2592 4.1227C19.0165 3.93339 19.75 4.50613 19.75 5.28669V12.6537C19.75 13.298 19.3115 13.8596 18.6864 14.0159L18.472 14.0695C16.7024 14.5119 14.8385 14.3854 13.1449 13.708C11.5821 13.0828 9.8712 12.9258 8.22067 13.2559L6.5 13.6V21.75C6.5 22.1642 6.16421 22.5 5.75 22.5C5.33579 22.5 5 22.1642 5 21.75V1.75C5 1.33579 5.33579 1 5.75 1Z"></path>
    </svg>
  );
}
