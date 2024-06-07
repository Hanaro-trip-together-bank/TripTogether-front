/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { HStack, Spacer, VStack } from "../components/common/Stack";
import Option from "../components/common/Option";
import NavigationBar from "../components/common/TopBars/NavigationBar";
import { useNavigation } from "../contexts/useNavigation";
import { PlaceResDto } from "../types/Place";
import { CityResDto } from "../types/City";
import Arrow from "../components/common/Arrow";
import { CategoriesGetURL, PlacesGetURL } from "../utils/urlFactory";
import { useFetch } from "../hooks/useFetch";
import { CategoryResDto } from "../types/Category";
import Select from "../components/common/Select";
import cn from "../utils/cn";

type SelectPlacePageProps = {
  cities: CityResDto[];
  onDone: (place: PlaceResDto) => void;
};

export default function SelectPlacePage({
  cities,
  onDone,
}: SelectPlacePageProps) {
  const { back } = useNavigation();
  const [selected, setSelected] = useState(cities[0].cityNameKo);
  const [selectedCityIdx, setSelectedCityIdx] = useState(cities[0].cityIdx);
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(-1);

  return (
    <VStack className="w-full h-full">
      <NavigationBar title={"장소 선택"} />
      <HStack className="my-3 mx-2 snap-x py-2 overflow-x-auto">
        {cities.map((city) => (
          <Option
            className="text-nowrap snap-start !min-h-7"
            key={city.cityIdx}
            onClick={() => {
              setSelected(city.cityNameKo);
              setSelectedCityIdx(city.cityIdx);
            }}
            selected={selected === city.cityNameKo}
          >
            {city.cityNameKo}
          </Option>
        ))}
      </HStack>

      <div className="w-full px-2">
        <Select
          className="w-full"
          options={["모두", "관광명소", "쇼핑", "맛집"]}
          onSelect={setSelectedCategoryIdx}
        />
      </div>

      <PlaceList
        cityIdx={selectedCityIdx}
        categoryIdx={selectedCategoryIdx}
        onClick={(place: PlaceResDto) => {
          onDone(place);
          back();
        }}
      />
    </VStack>
  );
}

function PlaceList({
  onClick,
  cityIdx,
  categoryIdx,
}: {
  onClick: (place: PlaceResDto) => void;
  cityIdx: number;
  categoryIdx: number;
}) {
  const { data, refetch } = useFetch<null, PlaceResDto[]>(
    PlacesGetURL(cityIdx, categoryIdx > 0 ? categoryIdx : -1),
    "GET"
  );
  useEffect(() => {
    refetch();
  }, [cityIdx, categoryIdx]);
  return (
    <VStack className="h-full overflow-y-auto">
      {(data ?? []).map((place) => (
        <button key={place.placeIdx} onClick={() => onClick(place)}>
          <HStack className="p-2 border-b-0.5 items-center w-full font-bold hover:bg-gray-200">
            <img
              className="w-16 h-16 rounded-md"
              src={place.placeImg}
              alt={place.placeNameEng}
            />
            <VStack className="mx-3 mt-1 items-start text-start">
              {place.placeNameKo && (
                <p className="line-clamp-2">{place.placeNameKo}</p>
              )}
              <p
                className={cn(
                  "line-clamp-2",
                  place.placeNameKo ? "text-sm text-gray-400" : ""
                )}
              >
                {place.placeNameEng}
              </p>
            </VStack>
            <Spacer />
            <Arrow direction="right" />
          </HStack>
        </button>
      ))}
    </VStack>
  );
}
