import { ChangeEvent, useRef, useState } from "react";
import { HStack, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import { ExchangeRate } from "../../../types/ExchangeRate";

type ExchangeRateSearchPageProps = {
  rates: ExchangeRate[];
  onClickSelected: (rate: ExchangeRate) => void;
};

export default function ExchangeRateSearchPage(
  props: ExchangeRateSearchPageProps
) {
  const { rates, onClickSelected } = props;
  const [search, setSearch] = useState("");
  const onChanageSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { back } = useNavigation();

  const getFilteredRates = () => {
    if (search === "") {
      return rates;
    }
    return rates.filter((rate) => rate.curName.includes(search));
  };

  const filteredRates = getFilteredRates();

  return (
    <VStack className="bg-gray-50 gap-4 w-full h-full">
      <NavigationBar title="대상통화 선택" />
      <VStack className="px-6 bg-gray-50 h-full">
        <div
          id="selectExchangeRate"
          className="flex justify-between p-3 rounded-md border border-gray-300 bg-white focus:border-primary"
        >
          <input
            value={search}
            onChange={onChanageSearch}
            className="w-full"
            placeholder="국가명으로 검색해주세요"
          />
          <span>🔎</span>
        </div>
        <VStack className="p-2 overflow-y-auto">
          {filteredRates.map((rate) => (
            <button
              key={rate.curCode}
              onClick={() => {
                onClickSelected(rate);
                back();
              }}
            >
              <HStack className="text-lg">
                <span className="text-2xl">{rate.curIcon} </span>
                {`${rate.curName} ${rate.curCode}`}
              </HStack>
            </button>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
