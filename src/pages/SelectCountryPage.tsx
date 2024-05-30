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

const europe = [
  {
    nameEn: "Greece",
    nameKo: "그리스",
    naverId: "GR189398",
    countryGeoId: 189398,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174555328_LHX7OXF4I.png/164_m.png?type=m1500",
  },
  {
    nameEn: "The Netherlands",
    nameKo: "네덜란드",
    naverId: "NL188553",
    countryGeoId: 188553,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174547041_9J4AYUQBT.png/172_m.png?type=m1500",
  },
  {
    nameEn: "Norway",
    nameKo: "노르웨이",
    naverId: "NO190455",
    countryGeoId: 190455,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174547714_J5U15HPHZ.png/165_m.png?type=m1500",
  },
  {
    nameEn: "Denmark",
    nameKo: "덴마크",
    naverId: "DK189512",
    countryGeoId: 189512,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174547701_QTL5U0I5H.png/154_m.png?type=m1500",
  },
  {
    nameEn: "Germany",
    nameKo: "독일",
    naverId: "DE187275",
    countryGeoId: 187275,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174547744_5EIOFPRER.png/175_m.png?type=m1500",
  },
  {
    nameEn: "Latvia",
    nameKo: "라트비아",
    naverId: "LV274960",
    countryGeoId: 274960,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174547750_6BVQC0QN4.png/27_m.png?type=m1500",
  },
  {
    nameEn: "Romania",
    nameKo: "루마니아",
    naverId: "RO294457",
    countryGeoId: 294457,
    image:
      "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174548787_VMRHQDLYX.png/30_m.png?type=m1500",
  },
];

const mockContinents = [
  "유럽",
  "동남아",
  "중남미",
  "동북아",
  "오세아니아/남태평양",
  "중동/아프리카",
  "서남아시아",
  "북미/하와이",
  "러시아/중앙아시아",
];

type CountryPreview = {
  countryGeoId: number;
  image: string;
};

export default function SelectCountryPage() {
  const { back } = useNavigation();
  const [selected, setSelected] = useState("유럽");
  const [countries, setCountries] = useState(europe);

  return (
    <VStack className="w-full h-full">
      <NavigationBar title={"어디로 떠나시나요? 🛫"} />

      <HStack className="my-3 mx-2 h-12 !pb-2 snap-x overflow-x-scroll">
        {mockContinents.map((con) => (
          <Option
            className="text-nowrap snap-start !min-h-7"
            key={con}
            onClick={() => setSelected(con)}
            selected={selected === con}
          >
            {con}
          </Option>
        ))}
      </HStack>

      <VStack className="border border-gray-400 overflow-y-scroll">
        {countries.map((c) => (
          <NavigationLink
            key={c.countryGeoId}
            to={{
              page: (
                <CityCartProvider>
                  <SelectCitiesPage />
                </CityCartProvider>
              ),
            }}
          >
            <TripView
              id={c.countryGeoId}
              nameKo={c.nameKo}
              nameEn={c.nameEn}
              subtitle={c.nameEn}
              image={c.image}
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
      {/* TODO 이름 긴 나라를 어떻게 할 것인가?
      <div>
        <HStack className="gap-5 justify-center m-3">
          <Button roundedFull gray onClick={back}>
            뒤로
          </Button>
          <Button roundedFull>완료</Button>
        </HStack>
      </div> */}
    </VStack>
  );
}
