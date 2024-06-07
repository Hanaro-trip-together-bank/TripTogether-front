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

type SelectCitiesPageProps = {
  countryIdx: number;
  info: Trip;
};

export default function SelectCitiesPage(props: SelectCitiesPageProps) {
  const { countryIdx, info } = props;
  const { back } = useNavigation();
  const [cities, setCities] = useState<City[]>([]);
  const { cart, cityIds } = useCityCartManager();

  const citiesFetch = useFetch<null, City[]>(
    CitiesGetByCountries(countryIdx),
    "GET"
  );
  const { error, trigger } = useFetchTrigger<Trip | null, void>(
    TripsPostURL(),
    "POST"
  );

  const onClickCreateTrip = () => {
    trigger({ ...info, cities: cityIds });
    if (!error) {
      back();
      back();
      back();
    }
  };

  useEffect(() => {
    if (citiesFetch.data) {
      setCities(citiesFetch.data);
    }
  }, [citiesFetch.data]);

  return (
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
            <VStack key={c.cityIdx} className="items-center min-w-20 min-h-20">
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
  );
}

// const temp = [
//   {
//     naverId: "GRJMK189430",
//     nameKo: "미코노스 섬",
//     nameEn: "Mykonos",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229162821179_SUXE5C25W.jpg/fb345_3_i1.jpg?type=w540_fst",
//     countryGeoId: 189398,
//   },
//   {
//     naverId: "GRATN189433",
//     nameKo: "산토리니",
//     nameEn: "Santorini",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229162116699_Y15JPAMDG.jpg/fb344_3_i1.jpg?type=w540_fst",
//     countryGeoId: 189398,
//   },
//   {
//     naverId: "GRCHI189400",
//     nameKo: "아테네",
//     nameEn: "Athens",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229160501475_893QSWYFX.jpg/fb343_3_i1.jpg?type=w540_fst",
//     countryGeoId: 189398,
//   },
//   {
//     naverId: "GRZTH189462",
//     nameKo: "자킨토스",
//     nameEn: "Zakynthos",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_12/20201229163412800_HIVDM70GQ.jpg/fb346_3_i1.jpg?type=w540_fst",
//     countryGeoId: 189398,
//   },
//   {
//     naverId: "GR827315843",
//     nameKo: "칼람바카",
//     nameEn: "Kalambaka",
//     image:
//       "http://media-cdn.tripadvisor.com/media/photo-o/1b/e5/b9/45/20200829-183629-largejpg.jpg",
//     countryGeoId: 189398,
//   },
//   {
//     naverId: "ATGRZ190432",
//     nameKo: "그라츠",
//     nameEn: "Graz",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130802006_MK0J1VODA.jpg/fb223_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ATICH664937",
//     nameKo: "바드 이스흘",
//     nameEn: "Bad Ischl",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130713139_OPFU78T92.jpg/fb222_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ATVIE190454",
//     nameKo: "빈",
//     nameEn: "Vienna",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200904164421586_5I15BSKW5.jpg/fb123_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "AT688296672",
//     nameKo: "산트 울프강",
//     nameEn: "St. Wolfgang",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130611431_7DUICTG55.jpg/fb220_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "AT82608664",
//     nameKo: "세인트 길겐",
//     nameEn: "St Gilgen",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130652672_UU1VRCVYL.jpg/fb221_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ATINN190445",
//     nameKo: "인스브루크",
//     nameEn: "Innsbruck",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130258504_26ZJOLRJP.jpg/fb219_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ATSZG190441",
//     nameKo: "잘츠부르크",
//     nameEn: "Salzburg",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200904165238171_Y8BSX5Q4F.jpg/fb124_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ATHLT190427",
//     nameKo: "할슈타트",
//     nameEn: "Hallstatt",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023130035895_4X2I81984.jpg/fb218_3_i1.jpg?type=w540_fst",
//     countryGeoId: 190410,
//   },
//   {
//     naverId: "ITNAP187785",
//     nameKo: "나폴리",
//     nameEn: "Naples",
//     image:
//       "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_16/20220401104733122_L6700LM23.jpg/fb557_3_i1.jpg?type=w540_fst",
//     countryGeoId: 187768,
//   },
// ];
// const data = temp.map((t, idx) => ({ ...t, cityIdx: idx }));
