import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import Modal from "../../../components/common/Modals/Modal";
import Keypad from "../../../components/common/Modals/Keypad";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import useToggle from "../../../hooks/useToggle";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import ExchangeRateSearchPage from "./ExchangeRateSearchPage";
import ExchangeRate from "../../../types/ExchangeReate";
import Button from "../../../components/common/Button";
import { useNavigation } from "../../../contexts/useNavigation";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";

type OverLessType = {
  nameKo: string;
  value: string;
};

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
      cur_unit: "AED",
      cur_name: "아랍에미리트 디르함",
      cur_icon: "🇸🇩",
      deal_bas_r: "371.58",
    },
    {
      cur_unit: "AUD",
      cur_name: "호주 달러",
      cur_icon: "🇳🇿",
      deal_bas_r: "901.79",
    },
    {
      cur_unit: "BHD",
      cur_name: "바레인 디나르",
      cur_icon: "🇧🇭",
      deal_bas_r: "3,620.26",
    },
    {
      cur_unit: "BND",
      cur_name: "브루나이 달러",
      cur_icon: "🇧🇳",
      deal_bas_r: "1,009.24",
    },
    {
      cur_unit: "CAD",
      cur_name: "캐나다 달러",
      cur_icon: "🇨🇦",
      deal_bas_r: "994.72",
    },
    {
      cur_unit: "CHF",
      cur_name: "스위스 프랑",
      cur_icon: "🇨🇭",
      deal_bas_r: "1,494.36",
    },
    {
      cur_unit: "CNH",
      cur_name: "위안화",
      cur_icon: "🇨🇳",
      deal_bas_r: "187.77",
    },
    {
      cur_unit: "DKK",
      cur_name: "덴마아크 크로네",
      cur_icon: "🇩🇰",
      deal_bas_r: "197.59",
    },
    {
      cur_unit: "EUR",
      cur_name: "유로",
      cur_icon: "🇪🇺",
      deal_bas_r: "1,474.05",
    },
    {
      cur_unit: "GBP",
      cur_name: "영국 파운드",
      cur_icon: "🇬🇧",
      deal_bas_r: "1,732.89",
    },
    {
      cur_unit: "HKD",
      cur_name: "홍콩 달러",
      cur_icon: "🇭🇰",
      deal_bas_r: "174.66",
    },
    {
      cur_unit: "IDR(100)",
      cur_name: "인도네시아 루피아",
      cur_icon: "🇮🇩",
      deal_bas_r: "8.45",
    },
    {
      cur_unit: "JPY(100)",
      cur_name: "일본 옌",
      cur_icon: "🇯🇵",
      deal_bas_r: "865.63",
    },
    {
      cur_unit: "KRW",
      cur_name: "한국 원",
      cur_icon: "🇰🇷",
      deal_bas_r: "1",
    },
    {
      cur_unit: "KWD",
      cur_name: "쿠웨이트 디나르",
      cur_icon: "🇰🇼",
      deal_bas_r: "4,446.33",
    },
    {
      cur_unit: "MYR",
      cur_name: "말레이지아 링기트",
      cur_icon: "🇲🇾",
      deal_bas_r: "290.17",
    },
    {
      cur_unit: "NOK",
      cur_name: "노르웨이 크로네",
      cur_icon: "🇳🇴",
      deal_bas_r: "128.8",
    },
    {
      cur_unit: "NZD",
      cur_name: "뉴질랜드 달러",
      cur_icon: "🇳🇿",
      deal_bas_r: "834.37",
    },
    {
      cur_unit: "SAR",
      cur_name: "사우디 리얄",
      cur_icon: "🇸🇦",
      deal_bas_r: "363.87",
    },
    {
      cur_unit: "SEK",
      cur_name: "스웨덴 크로나",
      cur_icon: "🇸🇪",
      deal_bas_r: "127.82",
    },
    {
      cur_unit: "SGD",
      cur_name: "싱가포르 달러",
      cur_icon: "🇸🇬",
      deal_bas_r: "1,009.24",
    },
    {
      cur_unit: "THB",
      cur_name: "태국 바트",
      cur_icon: "🇹🇭",
      deal_bas_r: "37.05",
    },
    {
      cur_unit: "USD",
      cur_name: "미국 달러",
      cur_icon: "🇺🇸",
      deal_bas_r: "1,364.8",
    },
  ],
};

const concatNameAndUnit = (exchangeRate: ExchangeRate) => {
  const name = exchangeRate.cur_name.split(" ")[0];
  return `${name} ${exchangeRate.cur_unit}`;
};

export default function ExchangeRateSetPage() {
  const { back } = useNavigation();
  const [selected, setSelected] = useState(mockData.exchangeRates[0]);

  const onClickSelected = (rate: ExchangeRate) => {
    setSelected(rate);
  };

  const rate = selected.deal_bas_r.replace(",", "").split(".");
  const first = parseInt(rate[0]);
  const second = parseInt(rate[1]);

  // 기본적으로 useEffect로 fetch를 받을 때 사용하자
  // const [goalRate, setGoalRate] = useState("1,364.8");
  const [selectedOverLess, setSeletedOverLess] = useState(LESS);
  const [showKeypad, toggleShowKeypad] = useToggle();

  const firstValue = useKeypadMappedNumber(first);
  const secondValue = useKeypadMappedNumber(second);

  useEffect(() => {
    firstValue.set(first);
    secondValue.set(second);
  }, [first, second]);

  const [padValue, setPadValue] = useState(true);

  const onClickOverLess = (value: string) => {
    value === "OVER" ? setSeletedOverLess(OVER) : setSeletedOverLess(LESS);
  };

  return (
    <VStack className="px-6 bg-gray-50 gap-4 w-full h-full">
      <NavigationBar title="환율 알림신청 🔔" />
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
          page: (
            <ExchangeRateSearchPage
              rates={mockData.exchangeRates}
              onClickSelected={onClickSelected}
            />
          ),
        }}
      >
        <p>{concatNameAndUnit(selected)}</p>
        <p>🔎</p>
      </NavigationLink>

      <VStack className="p-4 rounded-md border border-gray-300 bg-white items-center">
        <p className="text-sm">{`${mockData.exchangeRateTime} 기준 환율`}</p>
        <HStack>
          <p className="text-2xl">{selected.cur_icon}</p>
          <p className="text-xl text-primary">
            {selected.deal_bas_r}원
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
        <Button roundedFull>완료</Button>
      </HStack>

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
  );
}
