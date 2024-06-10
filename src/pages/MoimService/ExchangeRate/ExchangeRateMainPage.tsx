/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import ExchangeRateSetPage from "./ExchangeRateSetPage";
import {
  ExchangeRateAlarm,
  ExchangeRateAlarmDelete,
  ExchangeRateAlarmsResponse,
} from "../../../types/ExchangeRate";
import { useFetch } from "../../../hooks/useFetch";
import {
  ExchangeRateAlarmDeleteURL,
  ExchangeRateAlarmsGetURL,
} from "../../../utils/urlFactory";
import { useNavigation } from "../../../contexts/useNavigation";
import Modal from "../../../components/common/Modals/Modal";
import Button from "../../../components/common/Button";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import { useAuth } from "../../../contexts/useAuth";

export default function ExchangeRateMainPage() {
  const { member } = useAuth();
  const { path } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [alarms, setAlarms] = useState<ExchangeRateAlarm[]>([]);
  const [targetAlarmIdx, setTargetAlarmIdx] = useState<number | undefined>(
    undefined
  );

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", targetAlarmIdx);

  const response = useFetch<null, ExchangeRateAlarmsResponse>(
    ExchangeRateAlarmsGetURL(member.memberIdx),
    "GET"
  );
  const deleteAlarmFetch = useFetchTrigger<null, ExchangeRateAlarmDelete>(
    ExchangeRateAlarmDeleteURL(member.memberIdx, targetAlarmIdx as number),
    "DELETE"
  );

  // 뒤로가기로 이 페이지로 돌아왔을 때 리페치
  const currentPathLength = useMemo(() => path.length, []);

  const onClickDeleteButton = (alarmIdx: number) => {
    setShowModal(true);
    setTargetAlarmIdx(alarmIdx);
  };
  const onClickDeleteConfirm = async () => {
    deleteAlarmFetch.trigger(null);
    setShowModal(false);
    setTargetAlarmIdx(undefined);
  };

  useEffect(() => {
    if (!deleteAlarmFetch.isLoading) response.refetch();
  }, [deleteAlarmFetch.isLoading]);

  useEffect(() => {
    if (path.length == currentPathLength) {
      response.refetch();
    }
  }, [path.length]);

  useLayoutEffect(() => {
    if (response.data) {
      setAlarms(response.data.data);
    }
  }, [response.data]);

  return (
    <>
      <VStack className="bg-gray-50 h-full w-full">
        <NavigationBar title="나의 환율알림 $" />

        <VStack className="overflow-y-scroll p-6">
          <div className="text-gray-500 mx-3">
            <div>{`희망하는 환율에 등록된 통화가 등록 가격 도달 시`}</div>
            <div>{`하루 한 번 알림을 보내드립니다.`}</div>

            <HStack className="justify-between">
              <span>{`(최대 5개까지 설정 가능)`}</span>
              <span>현재 {alarms.length}/5개</span>
            </HStack>
          </div>
          {alarms.map((alarm) => (
            <VStack
              key={alarm.idx}
              className="rounded-2xl h-32 w-full bg-white shadowed px-6 py-4 mb-4"
            >
              <VStack className="">
                <HStack className="justify-between">
                  <p className="text-xl font-bold">{`${alarm.curIcon} ${alarm.curCode}`}</p>
                  <button
                    className="text-gray-400"
                    onClick={() => onClickDeleteButton(alarm.idx)}
                  >
                    <div className="text-xl w-5 h-5">
                      <TrashCan />
                    </div>
                  </button>
                </HStack>
                <p className="text-xl font-bold">{` ${alarm.curName}`}</p>
              </VStack>
              <HStack className="justify-end items-end">
                <span className="font-bold text-lg">{`${alarm.curRate} ${alarm.curType === "OVER" ? "🔺" : "🔻"}`}</span>
              </HStack>
            </VStack>
          ))}
        </VStack>

        <Spacer />
        <VStack className="m-6">
          <NavigationLink
            to={{
              page: <ExchangeRateSetPage />,
              backgroundColor: "bg-gray-50",
            }}
            className="p-2 rounded-lg bg-primary w-full text-white"
          >
            환율알림 신청
          </NavigationLink>
        </VStack>
      </VStack>

      <Modal show={showModal} onClose={() => setShowModal(false)} backDrop>
        <VStack>
          <span className="text-bold text-gray-500 pb-4">
            정말 삭제하시겠습니까?
          </span>
          <HStack>
            <Button gray onClick={() => setShowModal(false)}>
              취소
            </Button>
            <Button className="w-full" onClick={onClickDeleteConfirm}>
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}
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
