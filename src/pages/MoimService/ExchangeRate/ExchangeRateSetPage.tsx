/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Modal from "../../../components/common/Modals/Modal";
import Keypad from "../../../components/common/Modals/Keypad";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import useToggle from "../../../hooks/useToggle";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import ExchangeRateSearchPage from "./ExchangeRateSearchPage";
import {
  ExchangeRate,
  ExchangeRateCreateRequest,
  ExchangeRateCreateResponse,
  OverLessType,
} from "../../../types/ExchangeRate";
import Button from "../../../components/common/Button";
import { useNavigation } from "../../../contexts/useNavigation";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useFetch } from "../../../hooks/useFetch";
import { ExchangeRateReqDto } from "../../../types/exchangeRate/ExchangeRate";
import { ExchangeRateGetURL } from "../../../utils/urlFactory";
import { useFetchTrigger } from "../../../hooks/useFetchTrigger";
import ExchangeRateDonePage from "./ExchangeRateDonePage";
import Loading from "../../../components/common/Modals/Loading";
import { useAuth } from "../../../contexts/useAuth";

const OVER: OverLessType = {
  nameKo: "이상",
  value: "OVER",
};
const LESS: OverLessType = {
  nameKo: "이하",
  value: "LESS",
};

const mockData: { exchangeRateTime: string; exchangeRates: ExchangeRate[] } = {
  exchangeRateTime: "2024-05-30 16:03",
  exchangeRates: [
    {
      curCode: "AED",
      curName: "아랍에미리트 디르함",
      curIcon: "🇸🇩",
      curRate: "371.58",
    },
  ],
};

const concatNameAndUnit = (exchangeRate: ExchangeRate) => {
  const name = exchangeRate.curName.split(" ")[0];
  return `${name} ${exchangeRate.curCode}`;
};

export default function ExchangeRateSetPage() {
  const { member } = useAuth();
  const { back, navigateTo } = useNavigation();
  const [selected, setSelected] = useState<ExchangeRate>(
    () => mockData.exchangeRates[0]
  );
  const [padValue, setPadValue] = useState(true);

  const onClickOverLess = (value: string) => {
    value === "OVER" ? setSeletedOverLess(OVER) : setSeletedOverLess(LESS);
  };

  const onClickSelected = (rate: ExchangeRate) => {
    setSelected(rate);
  };

  const rate = String(selected.curRate).split(".");
  const first = parseInt(rate[0]);
  const second = parseInt(rate[1]);

  // 기본적으로 useEffect로 fetch를 받을 때 사용하자
  // const [goalRate, setGoalRate] = useState("1,364.8");
  const [selectedOverLess, setSeletedOverLess] = useState(LESS);
  const [showKeypad, toggleShowKeypad] = useToggle();

  const firstValue = useKeypadMappedNumber(first);
  const secondValue = useKeypadMappedNumber(second);

  const { data, isLoading } = useFetch<null, ExchangeRateReqDto>(
    ExchangeRateGetURL(),
    "GET"
  );

  const createAlarmFetch = useFetchTrigger<
    ExchangeRateCreateRequest,
    ExchangeRateCreateResponse
  >(ExchangeRateGetURL(), "POST");

  const onClickCreateAlarm = () => {
    createAlarmFetch.trigger({
      memberIdx: member.memberIdx,
      curCode: selected.curCode,
      curRate: `${firstValue.amount}.${secondValue.amount}`,
      rateAlarmType: selectedOverLess.value,
    });
    if (!createAlarmFetch.error) {
      back();
      navigateTo({
        page: <ExchangeRateDonePage />,
        backgroundColor: "bg-gray-50",
      });
    }
  };

  useEffect(() => {
    if (data) {
      setSelected(data.data.exchangeRates[0]);
    }
  }, [data]);

  useEffect(() => {
    firstValue.set(first);
    secondValue.set(second);
  }, [first, second]);

  return (
    <>
      <VStack className="bg-gray-50 gap-4 w-full h-full">
        <NavigationBar title="환율 알림신청 🔔" />
        <VStack className="px-6 bg-gray-50 gap-4 w-full h-full">
          <div className="text-gray-500">
            {`희망하는 환율에 등록된 통화가 등록 가격 도달 시 하루 한 번 알림을
        보내드립니다.\n
        (최대 5개까지 설정 가능)`}
          </div>

          <label htmlFor="selectExchangeRate" className="font-bold">
            대상통화 선택
          </label>
          <NavigationLink
            className="flex justify-between p-3 rounded-md border border-gray-300 bg-white"
            to={{
              backgroundColor: "bg-gray-50",
              page: (
                <ExchangeRateSearchPage
                  rates={data ? data.data.exchangeRates : []}
                  onClickSelected={onClickSelected}
                />
              ),
            }}
          >
            <p>{concatNameAndUnit(selected)}</p>
            <p>🔎</p>
          </NavigationLink>

          <VStack className="p-4 rounded-md border border-gray-300 bg-white items-center">
            <p className="text-sm">{`${data ? data.data.exchangeRateTime : new Date().toLocaleString()} 기준 환율`}</p>
            <HStack>
              <p className="text-2xl">{selected.curIcon}</p>
              <p className="text-xl text-primary">
                {selected.curRate}원
                <span className="text-sm text-black">
                  ({concatNameAndUnit(selected)})
                </span>
              </p>
            </HStack>
          </VStack>

          <HStack className="w-full h-30 align-bottom items-end">
            <VStack className="w-8/12 p-2 rounded-md bg-white border border-gray-300">
              <button
                className="flex flex-col"
                onClick={() => {
                  setPadValue(true);
                  toggleShowKeypad();
                }}
              >
                <p className="text-sm justify-start text-gray-500">희망환율</p>
                <HStack className="justify-end">
                  <span className="text-lg">
                    {firstValue.amount.toLocaleString()}
                  </span>
                </HStack>
              </button>
            </VStack>
            <span className="text-lg font-bold">.</span>
            <VStack className="w-24 p-2 rounded-md bg-white border border-gray-300 justify-items-end">
              <button
                className="flex flex-col"
                onClick={() => {
                  setPadValue(false);
                  toggleShowKeypad();
                }}
              >
                <span className="text-sm text-gray-500">소수점 아래 </span>
                <span className="text-lg">
                  {secondValue.amount.toLocaleString()}
                </span>
              </button>
            </VStack>
          </HStack>
          <HStack className="justify-end gap-3">
            <button
              className="rounded-md h-16 w-16 border border-gray-300 shadow-md active:translate-y-1 active:bg-gray-200"
              onClick={() => onClickOverLess(OVER.value)}
            >
              🔺<p className="text-sm text-gray-500">{OVER.nameKo}</p>
            </button>
            <button
              className="rounded-md h-16 w-16 border border-gray-300 shadow-md active:translate-y-1 active:bg-gray-200"
              onClick={() => onClickOverLess(LESS.value)}
            >
              🔻<p className="text-sm text-gray-500">{LESS.nameKo}</p>
            </button>
          </HStack>

          <p className="mt-20 w-full text-center text-xl text-primary">
            {`${firstValue.amount}.${secondValue.amount}원`}
            <span className="ml-2 underline font-bold">
              {selectedOverLess.nameKo}
            </span>
            {`일때 알려드릴까요?`}
          </p>

          <Spacer />
          <HStack className="gap-5 justify-center m-3">
            <Button roundedFull gray onClick={back}>
              취소
            </Button>
            <Button roundedFull onClick={onClickCreateAlarm}>
              완료
            </Button>
          </HStack>
        </VStack>

        {/* 키패드 시트 */}
        <Modal
          xButton
          hideBackDrop
          modalType="sheet"
          backDrop
          dark
          show={showKeypad}
          onClose={toggleShowKeypad}
        >
          {padValue ? (
            <Keypad
              type={3}
              onAdd={firstValue.add}
              onClear={firstValue.clear}
              onAppend={firstValue.append}
              onRemove={firstValue.remove}
              onDone={toggleShowKeypad}
            />
          ) : (
            <Keypad
              type={3}
              onAdd={secondValue.add}
              onClear={secondValue.clear}
              onAppend={secondValue.append}
              onRemove={secondValue.remove}
              onDone={toggleShowKeypad}
            />
          )}
        </Modal>
      </VStack>
      <Loading show={isLoading} label="실시간 환율 정보 불러오는 중..." />
    </>
  );
}
