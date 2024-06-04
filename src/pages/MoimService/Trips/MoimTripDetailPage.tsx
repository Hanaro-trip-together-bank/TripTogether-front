/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
import Arrow from "../../../components/common/Arrow";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Toggle from "../../../components/common/Toggle";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import useToggle from "../../../hooks/useToggle";
import cn from "../../../utils/cn";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modals/Modal";
import MoimScheduleEditPage from "./MoimScheduleEditPage";
import Avatar from "../../../components/common/Avatar";
import TextArea from "../../../components/common/TextArea";
import { TripResDto } from "../../../types/trip/TripResponseDto";
import { useFetch } from "../../../hooks/useFetch";
import {
  TripPlaceOrderUpdatePutURL,
  TripPlacesGetURL,
  TripReplyDeleteURL,
  TripReplyGetURL,
  TripReplyPostURL,
} from "../../../utils/urlFactory";
import Loading from "../../../components/common/Modals/Loading";
import addDaysAndFormat from "../../../utils/addDaysAndFormat";
import { useEffect, useMemo, useState } from "react";
import { useNavigation } from "../../../contexts/useNavigation";
import { TripPlaceResDto } from "../../../types/tripPlace/TripPlaceResponseDto";
import {
  TripReplyDeleteReqDto,
  TripReplyReqDto,
  TripReplyResDto,
} from "../../../types/tripReply/TripReply";
import formatDate from "../../../utils/formatDate";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { TripPlaceUpdateOrderReqDTO } from "../../../types/tripPlace/TripPlaceRequestDto";
import { useAuth } from "../../../contexts/useAuth";

interface MoimTripDetailPageProps {
  trip: TripResDto;
}

function MoimTripDetailPage({ trip }: MoimTripDetailPageProps) {
  const { member } = useAuth();
  const { navigateTo } = useNavigation();
  const [isEditMode, toggleIsEditMode] = useToggle();
  const [showEditConfirm, toggleShowEditConfirm] = useToggle();
  const [showScheduleDetail, toggleShowScheduleDetail] = useToggle();
  const [currentSchedule, setCurrentSchedule] = useState<TripPlaceResDto>();
  const colorBias = useMemo(
    () => Math.floor(Math.random() * colorPacks.length),
    []
  );
  const currentScheduleImageAvilable =
    currentSchedule?.place && currentSchedule.place.placeImg;

  const toggleEditWithCheck = () => {
    if (!isEditMode) {
      toggleIsEditMode();
    } else {
      toggleShowEditConfirm();
    }
  };
  const { data, isLoading, setData, refetch } = useFetch<
    null,
    TripPlaceResDto[]
  >(TripPlacesGetURL(trip.tripIdx), "GET");
  const openScheduleDetail = (schedule: TripPlaceResDto) => {
    if (isEditMode) return;
    setCurrentSchedule(schedule);
    toggleShowScheduleDetail();
  };
  const upSchedule = (day: number, currentOrder: number) => {
    // 첫 날 첫번째는 무시
    if (day == 1 && currentOrder == 1) return;
    const schedulesDraft = [...(data ?? [])];
    // 그 날의 첫번째라면 이전 날 맨 뒤로 넣기
    if (currentOrder == 1) {
      const lastDaysLastOrder: number = schedulesDraft.reduce(
        (maxOrder, cur) => {
          if (cur.tripDate == day) return Math.max(cur.placeOrder, maxOrder);
          else return maxOrder;
        },
        0
      );
      setData(
        schedulesDraft.map((schedule) => {
          if (schedule.placeOrder == currentOrder && schedule.tripDate == day)
            return {
              ...schedule,
              tripDate: day - 1,
              placeOrder: lastDaysLastOrder + 1,
            };
          else return schedule;
        })
      );
      return;
    }
    //아니면 바로 이전 인덱스랑 바꿔치기
    setData(
      schedulesDraft.map((schedule) => {
        if (schedule.placeOrder == currentOrder && schedule.tripDate == day)
          return {
            ...schedule,
            placeOrder: currentOrder - 1,
          };
        if (schedule.placeOrder == currentOrder - 1 && schedule.tripDate == day)
          return {
            ...schedule,
            placeOrder: currentOrder,
          };
        else return schedule;
      })
    );
    return;
  };
  const downSchedule = (day: number, currentOrder: number) => {
    const schedulesDraft = [...(data ?? [])];
    const lastDaysLastOrder: number = schedulesDraft.reduce((maxOrder, cur) => {
      if (cur.tripDate == trip.tripDay)
        return Math.max(cur.placeOrder, maxOrder);
      else return maxOrder;
    }, 0);
    // 마지막날 마지막은 무시
    if (day == trip.tripDay && currentOrder == lastDaysLastOrder) return;
    const thatDaysLastOrder: number = schedulesDraft.reduce((maxOrder, cur) => {
      if (cur.tripDate == day) return Math.max(cur.placeOrder, maxOrder);
      else return maxOrder;
    }, 0);
    // 그 날의 마지막이라면 다음 날 맨 앞에 넣기
    if (currentOrder == thatDaysLastOrder) {
      setData(
        schedulesDraft.map((schedule) => {
          if (schedule.placeOrder == currentOrder && schedule.tripDate == day)
            return {
              ...schedule,
              tripDate: day + 1,
              placeOrder: 1,
            };
          if (schedule.tripDate == day + 1)
            return {
              ...schedule,
              placeOrder: schedule.placeOrder + 1,
            };
          else return schedule;
        })
      );
      return;
    }
    //아니면 바로 다음 인덱스랑 바꿔치기
    setData(
      schedulesDraft.map((schedule) => {
        if (schedule.placeOrder == currentOrder && schedule.tripDate == day)
          return {
            ...schedule,
            placeOrder: currentOrder + 1,
          };
        if (schedule.placeOrder == currentOrder + 1 && schedule.tripDate == day)
          return {
            ...schedule,
            placeOrder: currentOrder,
          };
        else return schedule;
      })
    );
    return;
  };

  const tripOrderUpdateData = useFetchTrigger<TripPlaceUpdateOrderReqDTO, null>(
    TripPlaceOrderUpdatePutURL(trip.tripIdx),
    "PUT"
  );
  const updateOrder = () => {
    const tripPlaceUpdateOrderReqDto: TripPlaceUpdateOrderReqDTO = {
      memberIdx: member.memberIdx,
      newPlaces: [],
      orders: (data ?? []).map((schedule) => ({
        tripPlaceIdx: schedule.tripPlaceIdx,
        placeOrder: schedule.placeOrder,
        tripDate: schedule.tripDate,
      })),
    };
    tripOrderUpdateData.trigger(tripPlaceUpdateOrderReqDto);
  };
  useEffect(() => {
    if (!tripOrderUpdateData.isLoading) refetch();
  }, [tripOrderUpdateData.isLoading]);

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
        <VStack className="h-full overflow-y-scroll pl-8 pr-4 py-6">
          {Array.from({ length: trip.tripDay }, (_, i) => i + 1).map((day) => {
            const { textColor, borderColor } =
              colorPacks[(day + colorBias) % colorPacks.length];
            return (
              <VStack
                key={`day-${day}`}
                className={cn(
                  "border-l-4 w-full h-fit pb-16 gap-6",
                  borderColor
                )}
              >
                <VStack className="gap-6">
                  <HStack className="relative items-center px-6">
                    <VStack
                      className={cn(
                        "absolute -inset-x-0.5 -translate-x-1/2 w-10 h-10 rounded-full border-4 items-center justify-center bg-white",
                        borderColor
                      )}
                    >
                      <span
                        className={cn(
                          "text-xl font-extrabold text-center",
                          textColor
                        )}
                      >
                        {day}
                      </span>
                    </VStack>
                    <span className="w-full text-center text-xl font-bold underline underline-offset-4">
                      {day}일차
                    </span>
                    <Spacer />
                    <span className="absolute text-gray-500 right-0">
                      {trip.tripStartDay
                        ? addDaysAndFormat(new Date(trip.tripStartDay), day - 1)
                        : ""}
                    </span>
                  </HStack>
                  {/* 평소엔 구분선, 설정모드에선 +버튼 */}
                  <VStack
                    className={cn(
                      "relative border-b ml-4 transition-all items-center justify-center",
                      isEditMode ? "h-0" : "h-0",
                      borderColor
                    )}
                  >
                    <button
                      className={cn(
                        "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 mx-auto transition-all",
                        isEditMode
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-50",
                        borderColor,
                        textColor
                      )}
                    >
                      +
                    </button>
                  </VStack>
                </VStack>
                {data
                  ?.filter((schedule) => schedule.tripDate == day)
                  .sort((a, b) => a.placeOrder - b.placeOrder)
                  .map((schedule) => {
                    const imageAvailable =
                      schedule?.place && schedule.place.placeImg;
                    return (
                      <VStack key={schedule.tripPlaceIdx} className="gap-6">
                        <button onClick={() => openScheduleDetail(schedule)}>
                          <HStack className="relative items-center pl-8">
                            {/* 평소엔 장소 있다면 이미지, 없다면 작은 점, 수정모드에선 위치조정기 */}
                            <VStack
                              className={cn(
                                "absolute -inset-x-0.5 -translate-x-1/2 w-8 h-16 rounded-full border-4 items-center justify-center bg-white transition-all z-10",
                                borderColor,
                                isEditMode
                                  ? "opacity-100"
                                  : "scale-y-50 opacity-0 pointer-events-none"
                              )}
                            >
                              <button
                                className="absolute -translate-y-3 px-4 pt-4 mb-4"
                                onClick={() =>
                                  upSchedule(day, schedule.placeOrder)
                                }
                              >
                                <Arrow
                                  strokeWidth={16}
                                  className={textColor}
                                  direction="up"
                                />
                              </button>
                              <button
                                className="absolute translate-y-3 px-4 pb-4 mt-4"
                                onClick={() =>
                                  downSchedule(day, schedule.placeOrder)
                                }
                              >
                                <Arrow
                                  strokeWidth={16}
                                  className={textColor}
                                  direction="down"
                                />
                              </button>
                            </VStack>
                            {imageAvailable ? (
                              <VStack
                                className={cn(
                                  "absolute -inset-x-0.5 -translate-x-1/2 w-8 h-8 rounded-full border-4 items-center justify-center bg-white overflow-hidden",
                                  borderColor
                                )}
                              >
                                <img
                                  className="w-full h-full"
                                  src={schedule.place!.placeImg}
                                  alt={schedule.place!.placeNameEng}
                                />
                              </VStack>
                            ) : (
                              <VStack
                                className={cn(
                                  "absolute -inset-x-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 items-center justify-center bg-white overflow-hidden",
                                  borderColor
                                )}
                              ></VStack>
                            )}
                            <VStack className="leading-none items-start text-start font-bold !gap-0">
                              {/* 제목, 두줄 넘어가면 '...' 처리 */}
                              {schedule.place && (
                                <span className="text-lg leading-tight line-clamp-2">
                                  {schedule.place.placeNameKo}
                                </span>
                              )}
                              {/* 메모, 두줄 넘어가면 '...' 처리 */}
                              {schedule.placeMemo && (
                                <span
                                  className={
                                    schedule.place
                                      ? "text-gray-500 text-sm line-clamp-2"
                                      : "text-lg leading-tight line-clamp-2"
                                  }
                                >
                                  {schedule.placeMemo}
                                </span>
                              )}
                              {schedule.placeAmount > 0 && (
                                <span className="text-gray-500 text-sm">
                                  {schedule.placeAmount.toLocaleString()}원
                                </span>
                              )}
                            </VStack>
                            <Spacer />
                            {isEditMode ? (
                              <HStack className="text-nowrap">
                                <span className="text-red-500">삭제</span>
                              </HStack>
                            ) : (
                              <HStack>
                                <SpeechBubble />
                                <span> {schedule.replyCount}</span>
                                <Arrow direction="right" />
                              </HStack>
                            )}
                          </HStack>
                        </button>
                        {/* 평소엔 구분선, 설정모드에선 +버튼 */}
                        <VStack
                          className={cn(
                            "relative border-b ml-4 transition-all items-center justify-center",
                            isEditMode ? "h-0" : "h-0",
                            borderColor
                          )}
                        >
                          <button
                            className={cn(
                              "absolute bg-white rounded-full w-6 h-6 leading-none text-center font-bold border-2 mx-auto transition-all",
                              isEditMode
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-50",
                              borderColor,
                              textColor
                            )}
                          >
                            +
                          </button>
                        </VStack>
                      </VStack>
                    );
                  })}
              </VStack>
            );
          })}

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
                refetch();
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
                updateOrder();
              }}
            >
              적용
            </Button>
          </HStack>
        </VStack>
      </Modal>
      {/* 여행 상세 모달 */}
      {currentSchedule && (
        <Modal
          backDrop
          xButton
          modalType="sheet"
          show={showScheduleDetail}
          onClose={toggleShowScheduleDetail}
        >
          {currentScheduleImageAvilable && (
            <img
              className="absolute inset-0 w-full rounded-t-3xl -z-10 h-32 object-cover"
              src={currentSchedule?.place!.placeImg}
              alt={currentSchedule?.place!.placeNameEng}
            />
          )}

          <HStack className={currentScheduleImageAvilable ? "mt-32" : "mt-4"}>
            <VStack className="leading-none font-bold !gap-0">
              <span className="text-lg leading-tight">
                {currentSchedule?.place
                  ? currentSchedule.place.placeNameKo
                  : currentSchedule?.placeMemo}
              </span>
              {(currentSchedule?.placeAmount ?? 0) > 0 && (
                <span className="text-gray-500">
                  {currentSchedule?.placeAmount.toLocaleString()}원
                </span>
              )}
              {currentSchedule?.place && (
                <span className="text-gray-500 text-sm">
                  {currentSchedule.placeMemo}
                </span>
              )}
            </VStack>
            <Spacer />
            <button
              className="text-nowrap text-blue-500"
              onClick={() => {
                toggleShowScheduleDetail();
                navigateTo({
                  page: (
                    <MoimScheduleEditPage
                      schedule={currentSchedule}
                      onDone={refetch}
                    />
                  ),
                });
              }}
            >
              수정
            </button>
          </HStack>
          {/* 댓글 */}

          <ReplyList
            count={currentSchedule.replyCount}
            tripPlaceIdx={currentSchedule.tripPlaceIdx}
            onChange={refetch}
          />
        </Modal>
      )}
      <Loading show={isLoading} label="여행 일정 정보를 불러오는 중 ..." />
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

function ReplyList({
  count,
  tripPlaceIdx,
  onChange,
}: {
  count: number;
  tripPlaceIdx: number;
  onChange: () => void;
}) {
  const { member } = useAuth();
  const { data, isLoading, refetch } = useFetch<null, TripReplyResDto[]>(
    TripReplyGetURL(tripPlaceIdx),
    "GET"
  );
  // 댓글 등록 관련
  const [replyDraft, setReplyDraft] = useState("");
  const replyPostData = useFetchTrigger<TripReplyReqDto, null>(
    TripReplyPostURL(tripPlaceIdx),
    "POST"
  );
  const postReply = () => {
    if (replyDraft === "") return;
    const tripReplyReqDto: TripReplyReqDto = {
      memberIdx: member.memberIdx,
      tripReplyContent: replyDraft,
    };
    replyPostData.trigger(tripReplyReqDto);
  };
  useEffect(() => {
    if (!replyPostData.isLoading) {
      refetch();
      onChange();
      setReplyDraft("");
    }
  }, [replyPostData.isLoading]);
  // 댓글 삭제 관련
  const replyDeleteData = useFetchTrigger<TripReplyDeleteReqDto, null>(
    TripReplyDeleteURL(tripPlaceIdx),
    "DELETE"
  );
  const deleteReply = (tripReplyIdx: number) => {
    const tripReplyDeleteReqDto: TripReplyDeleteReqDto = {
      memberIdx: member.memberIdx,
      tripReplyIdx: tripReplyIdx,
    };
    replyDeleteData.trigger(tripReplyDeleteReqDto);
  };
  useEffect(() => {
    if (!replyDeleteData.isLoading) {
      refetch();
      onChange();
    }
  }, [replyDeleteData.isLoading]);

  return (
    <>
      <HStack className="justify-end items-center mb-2 pb-2 border-b border-gray-200">
        <span>댓글</span>
        <span className="rounded-full bg-gray-400 w-fit h-fit py-0.5 px-2 text-white text-sm leading-none">
          {data?.length ?? count}
        </span>
      </HStack>
      <VStack className="!gap-0 max-h-80 overflow-y-scroll">
        {isLoading
          ? Array.from({ length: count }, (_, i) => i + 1).map((i) => (
              <HStack
                key={i}
                className="gap-2 mb-2 pb-2 border-b border-gray-200"
              >
                <Avatar
                  backgroundColor={
                    colorPacks[i % colorPacks.length].backgroundColor
                  }
                  random
                />
                <VStack className="!gap-0">
                  <span className="animate-pulse">
                    <span className="inline-block text-nowrap rounded-md w-3/12 align-middle bg-current opacity-50 mr-4">
                      이름
                    </span>
                    <span className="inline-block text-nowrap rounded-md w-5/12 align-middle bg-current opacity-50">
                      05.31 13:46
                    </span>
                    <span className="inline-block text-nowrap rounded-md w-7/12 align-middle bg-current opacity-50">
                      비밀 댓글입니다.
                    </span>
                  </span>
                </VStack>
                <Spacer />
              </HStack>
            ))
          : data &&
            data.map((reply) => (
              <HStack
                key={reply.tripReplyIdx}
                className="gap-2 mb-2 pb-2 border-b border-gray-200"
              >
                <Avatar
                  backgroundColor={
                    colorPacks[reply.memberIdx % colorPacks.length]
                      .backgroundColor
                  }
                  seed={reply.memberIdx}
                  random
                />
                <VStack className="!gap-0">
                  <span className="">
                    <span className="font-bold">
                      {reply.teamMemberNickname}
                    </span>
                    <span className="text-sm text-gray-500">
                      {" " +
                        formatDate(
                          new Date(reply.lastModifiedAt ?? reply.createdAt)
                        )}
                    </span>
                  </span>
                  <span className="">{reply.tripReplyContent}</span>
                </VStack>
                <Spacer />
                {reply.memberIdx == member?.memberIdx && (
                  <>
                    <button className="text-nowrap text-blue-500">수정</button>
                    <button
                      className="text-nowrap text-red-500"
                      onClick={() => deleteReply(reply.tripReplyIdx)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </HStack>
            ))}
      </VStack>
      <HStack className="gap-2 mt-2">
        <TextArea
          className="w-full"
          border
          value={replyDraft}
          onChange={(e) => setReplyDraft(e.target.value)}
        />
        <button className="text-nowrap text-center" onClick={postReply}>
          등록
        </button>
      </HStack>
    </>
  );
}

const colorPacks: ColorPack[] = [
  {
    textColor: "text-teal-300",
    backgroundColor: "bg-teal-300",
    borderColor: "border-teal-300",
  },
  {
    textColor: "text-cyan-400",
    backgroundColor: "bg-cyan-400",
    borderColor: "border-cyan-400",
  },
  {
    textColor: "text-blue-400",
    backgroundColor: "bg-blue-400",
    borderColor: "border-blue-400",
  },
  {
    textColor: "text-indigo-400",
    backgroundColor: "bg-indigo-400",
    borderColor: "border-indigo-400",
  },
  {
    textColor: "text-violet-400",
    backgroundColor: "bg-violet-400",
    borderColor: "border-violet-400",
  },
  {
    textColor: "text-fuchsia-400",
    backgroundColor: "bg-fuchsia-400",
    borderColor: "border-fuchsia-400",
  },
  {
    textColor: "text-pink-400",
    backgroundColor: "bg-pink-400",
    borderColor: "border-pink-400",
  },
  {
    textColor: "text-rose-400",
    backgroundColor: "bg-rose-400",
    borderColor: "border-rose-400",
  },
  {
    textColor: "text-orange-400",
    backgroundColor: "bg-orange-400",
    borderColor: "border-orange-400",
  },
  {
    textColor: "text-yellow-400",
    backgroundColor: "bg-yellow-400",
    borderColor: "border-yellow-400",
  },
  {
    textColor: "text-lime-400",
    backgroundColor: "bg-lime-400",
    borderColor: "border-lime-400",
  },
  {
    textColor: "text-emerald-400",
    backgroundColor: "bg-emerald-400",
    borderColor: "border-emerald-400",
  },
];
