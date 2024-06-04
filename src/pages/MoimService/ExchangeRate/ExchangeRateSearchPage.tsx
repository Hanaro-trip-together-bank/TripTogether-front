import { ChangeEvent, useRef, useState } from "react";
import { HStack, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import ExchangeRate from "../../../types/ExchangeReate";

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
    return rates.filter((rate) => rate.cur_name.includes(search));
  };

  const filteredRates = getFilteredRates();

  return (
    <VStack className="p-6 bg-gray-50 gap-4 w-full h-full">
      <NavigationBar title="대상통화 선택" />
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

      <VStack className="overflow-y-scroll">
        {filteredRates.map((rate) => (
          <button
            key={rate.cur_unit}
            onClick={() => {
              onClickSelected(rate);
              back();
            }}
          >
            <HStack className="text-lg">
              <span className="text-2xl">{rate.cur_icon} </span>
              {`${rate.cur_name} ${rate.cur_unit}`}
            </HStack>
          </button>
        ))}
      </VStack>
    </VStack>
  );
}
