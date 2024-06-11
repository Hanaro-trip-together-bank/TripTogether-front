import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../components/common/Stack";

import TripView from "../components/common/TripView";
import { useCityCartManager } from "../contexts/City-Cart-Context";
import Button from "../components/common/Button";
import { useNavigation } from "../contexts/useNavigation";
import NavigationBar from "../components/common/TopBars/NavigationBar";
import { useFetch } from "../hooks/useFetch";
import { City, Trip } from "../types/trip/Trip";
import { CitiesGetByCountries, TripsPostURL } from "../utils/urlFactory";
import { useFetchTrigger } from "../hooks/useFetchTrigger";
import { useModal } from "../hooks/useModal";

type SelectCitiesPageProps = {
  countryIdx: number;
  info: Trip;
};

export default function SelectCitiesPage(props: SelectCitiesPageProps) {
  const { countryIdx, info } = props;
  const { back } = useNavigation();
  const [cities, setCities] = useState<City[]>([]);
  const { cart, cityIds } = useCityCartManager();
  const { modal, triggerModal } = useModal(
    "여행이 생성되었습니다.",
    () => {
      back();
      back();
      back();
    },
    false
  );

  const citiesFetch = useFetch<null, City[]>(
    CitiesGetByCountries(countryIdx),
    "GET"
  );
  const { trigger } = useFetchTrigger<Trip | null, void>(
    TripsPostURL(),
    "POST"
  );

  const onClickCreateTrip = () => {
    trigger({ ...info, cities: cityIds });
    triggerModal();
  };

  useEffect(() => {
    if (citiesFetch.data) {
      setCities(citiesFetch.data);
    }
  }, [citiesFetch.data]);

  return (
    <>
      <VStack className="w-full h-full">
        <NavigationBar title={"도시 선택"} />

        <VStack className="border border-gray-500 overflow-y-auto h-5/6 !min-h-96">
          {cities.map((c) => (
            <TripView
              key={c.cityIdx}
              id={c.cityIdx}
              nameKo={c.cityNameKo}
              nameEn={c.cityNameEng}
              subtitle={c.cityNameEng}
              image={c.cityImg}
              roundedFull={true}
            />
          ))}
        </VStack>
        <HStack className="h-1/6 !p-3 !gap-2 min-w-full overflow-x-scroll text-center justify-start items-center">
          {cart.length == 0 ? (
            <span className="text-xl">도시를 선택해주세요 🛣️</span>
          ) : (
            cart.map((c) => (
              <VStack
                key={c.cityIdx}
                className="items-center min-w-20 min-h-20"
              >
                <img
                  className="rounded-xl size-14"
                  src={c.image}
                  alt={c.cityIdx.toString()}
                />
                <span className="w-full overflow-hidden text-sm text-gray-500 text-center text-nowrap">
                  {c.nameKo}
                </span>
              </VStack>
            ))
          )}
        </HStack>

        <Spacer />
        <div>
          <HStack className="gap-5 justify-center m-3">
            <Button roundedFull gray onClick={back}>
              취소
            </Button>
            <Button roundedFull onClick={onClickCreateTrip}>
              완료
            </Button>
          </HStack>
        </div>
      </VStack>
      {modal}
    </>
  );
}
