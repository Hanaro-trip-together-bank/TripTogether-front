/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { HStack, VStack } from "../components/common/Stack";
import Option from "../components/common/Option";

import TripView from "../components/common/TripView";
import Button from "../components/common/Button";
import NavigationBar from "../components/common/TopBars/NavigationBar";
import { useNavigation } from "../contexts/useNavigation";
import NavigationLink from "../components/common/Navigation/NavigationLink";
import SelectCitiesPage from "./SelectCitiesPage";
import { CityCartProvider } from "../contexts/City-Cart-Context";
import { useFetch } from "../hooks/useFetch";
import { ContientGetURL, CountriesGetByContinent } from "../utils/urlFactory";
import { Continent, Country, Trip } from "../types/trip/Trip";
import { useFetchTrigger } from "../hooks/useFetchTrigger";
import { TripProvider } from "../contexts/Trip-Context";

type SelectCountryPageProps = {
  info: Trip;
};

export default function SelectCountryPage({ info }: SelectCountryPageProps) {
  const { back } = useNavigation();
  const [continents, setContinents] = useState<Continent[]>([]);
  const [selected, setSelected] = useState(1);
  const [countries, setCountries] = useState<Country[]>([]);

  const continentsFetch = useFetch<null, Continent[]>(ContientGetURL(), "GET");
  const countriesFetch = useFetchTrigger<null, Country[]>(
    CountriesGetByContinent(selected),
    "GET"
  );

  useEffect(() => {
    countriesFetch.trigger(null);
  }, [selected]);

  useEffect(() => {
    if (continentsFetch.data) {
      setContinents(continentsFetch.data);
    }
  }, [continentsFetch.data]);
  useEffect(() => {
    if (countriesFetch.data) {
      setCountries(countriesFetch.data);
    }
  }, [countriesFetch.data]);

  return (
    <VStack className="w-full h-full">
      <NavigationBar title={"어디로 떠나시나요? 🛫"} />

      <HStack className="my-3 mx-2 !min-h-12 !pb-2 overflow-x-auto">
        {continents.map((con) => (
          <Option
            className="text-nowrap snap-start !min-h-7"
            key={con.continentIdx}
            onClick={() => setSelected(con.continentIdx)}
            selected={selected === con.continentIdx}
          >
            {con.continentNameKo}
          </Option>
        ))}
      </HStack>

      <VStack className="h-full overflow-y-auto">
        {countries.map((c) => (
          <NavigationLink
            key={c.countryIdx}
            to={{
              page: (
                <TripProvider>
                  <CityCartProvider>
                    <SelectCitiesPage countryIdx={c.countryIdx} info={info} />
                  </CityCartProvider>
                </TripProvider>
              ),
            }}
          >
            <TripView
              id={c.countryIdx}
              nameKo={c.countryNameKo}
              nameEn={c.countryNameEng}
              subtitle={c.countryNameEng}
              image={c.countryImg}
              roundedFull={true}
              hasArrowButton={true}
            />
          </NavigationLink>
        ))}
      </VStack>

      <div className="mx-6 my-3">
        <Button gray className="w-full" onClick={back}>
          이전
        </Button>
      </div>
    </VStack>
  );
}
