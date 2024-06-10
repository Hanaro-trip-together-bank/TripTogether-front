import { useEffect, useState } from "react";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import ExchangeRateSetPage from "./ExchangeRateSetPage";
import {
  ExchangeRateAlarm,
  ExchangeRateAlarmsResponse,
} from "../../../types/ExchangeRate";
import { useFetch } from "../../../hooks/useFetch";
import { ExchangeRateAlarmsGetURL } from "../../../utils/urlFactory";

const mockData = {
  code: 200,
  message: "OK",
  data: [
    {
      idx: 1,
      curCode: "EUR",
      curName: "유로",
      curIcon: "🇪🇺",
      curRate: 2001.0,
      curType: "OVER",
    },
    {
      idx: 2,
      curCode: "AED",
      curName: "아랍에미리트 디르함",
      curIcon: "🇸🇩",
      curRate: 373.4,
      curType: "LESS",
    },
    {
      idx: 3,
      curCode: "AED",
      curName: "아랍에미리트 디르함",
      curIcon: "🇸🇩",
      curRate: 373.4,
      curType: "LESS",
    },
    {
      idx: 4,
      curCode: "AED",
      curName: "아랍에미리트 디르함",
      curIcon: "🇸🇩",
      curRate: 373.4,
      curType: "LESS",
    },
    {
      idx: 5,
      curCode: "AED",
      curName: "아랍에미리트 디르함",
      curIcon: "🇸🇩",
      curRate: 373.4,
      curType: "LESS",
    },
  ],
};

const memberIdx = 1;

export default function ExchangeRateMainPage() {
  const [alarms, setAlarms] = useState<ExchangeRateAlarm[]>(mockData.data);

  const response = useFetch<null, ExchangeRateAlarmsResponse>(
    ExchangeRateAlarmsGetURL(memberIdx),
    "GET"
  );

  useEffect(() => {
    if (response.data) {
      setAlarms(response.data.data);
    }
  }, [response.data]);

  return (
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
            <HStack className="w-full justify-between gap-4">
              <VStack className="items-start">
                <p className="text-xl font-bold">{`${alarm.curIcon} ${alarm.curCode}`}</p>
                <p className="text-xl font-bold">{` ${alarm.curName}`}</p>
              </VStack>

              <VStack className="text-lg gap-0 text-gray-500 scale-50">
                <span>삭제하기</span>
              </VStack>
            </HStack>
            <HStack className="justify-end items-end">
              <span className="font-bold text-lg">{`${alarm.curRate} ${alarm.curType === "OVER" ? "🔺" : "🔻"}`}</span>
            </HStack>
          </VStack>
        ))}
      </VStack>

      <Spacer />
      <VStack className="m-6">
        <NavigationLink
          to={{ page: <ExchangeRateSetPage /> }}
          className="p-2 rounded-lg bg-primary w-full text-white"
        >
          환율알림 신청
        </NavigationLink>
      </VStack>
    </VStack>
  );
}
