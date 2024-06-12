import { citiesWithIndex } from "./cities.js";

const url = "https://travelsearch-api.naver.com/graphql";
const headers = {
  Accept: `application/json`,
  "Accept-Encoding": `gzip, deflate, br`,
  "Accept-Language": `ko-KR,ko;q=0.9`,
  "Access-Control-Allow-Origin": `https://travelsearch-api.naver.com`,
  Connection: `keep-alive`,
  "Content-Type": `application/json`,
  Cookie: `BUC=zVwTwvEKcXTR9q-AXYTq-0l--JTlSurxm5Gb8n8V1As=; NNB=UHLXGTWUUJJWI; NID_AUT=q0tNuuGaiaGyAaObd2m3oXv2TYvBDKpL/5e14hcx82Aj4DcaPQpnP3OzS8naLyF6; NID_JKL=q3r9LIONijqbvhf/6+chPPnKlW/HSnl+gaTQ+K635bI=; NID_SES=AAABhIeLYXoB/TE+tHBTpNJAzx9q9HI09sf1dKdjzYQdTCVsus42LHM7b9SlHKvBzGtZr/8bvFojP9EDdGQs2y67sKNJycsFjxbz3kWqKuOyraaMOkL1CzKl0DfoBqtN8hQ+QfCMyHoj9Eg293hIYNnKs3UKlw+iCjVbqXsItCCXdbM3VEIDscx0ljF0kHMajYc1FhXg5KEUX2/sCI3kynXO1F5VrE1BsP9bjm0TDkxtJjg5QQ63dkEQFQNam1+RBdNJNK/euQ9GfG5hyHd3AHW7xRm2ftjaqfSSlnsAnYa2npPp5qf3+H40ihw2/aXUoCdMcYNn1C9zp/0qwF+Kgvod8tkJEE2ZvH5FFaWUw0cYN0IJSz+7reKpx79z5J7T/dd+D2UdBHBm+gWWA+sHujY5PDaXHG8h6zwf7+TXidcLmSPvfrwQWlykFKZAjrJybVWXtH7jB7dYJ1CcHY6aiIOkTikT+FAnn/hRn3XVgyyf5ThdwPuu2QwVmuf+tUGWZXV9Wvh93zJ1XeVKdjc1GvfdKG8=; nid_inf=605936605; NV_WETR_LAST_ACCESS_RGN_M="MDkyMzA1NzA="; NV_WETR_LOCATION_RGN_M="MDkyMzA1NzA="; m_loc=563f3ad6a72d746965f56c4b4ab4bc004648a02bf931342963e945bac841c863`,
  Host: `travelsearch-api.naver.com`,
  Origin: `https://travel.naver.com`,
  Referer: `https://travel.naver.com/my/plans/plan/ZeWpW`,
  "Sec-Fetch-Dest": `empty`,
  "Sec-Fetch-Mode": `cors`,
  "Sec-Fetch-Site": `same-site`,
  "User-Agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4.1 Safari/605.1.15`,
};

const body = (naverId) =>
  JSON.stringify({
    query:
      "query SEARCH_POI_BY_FILTER($filterType: PoiFilterType, $from: Int, $size: Int, $parentGeoCode: String) {\n  poi(\n    filterType: $filterType\n    from: $from\n    size: $size\n    parentGeoCode: $parentGeoCode\n  ) {\n    status\n    totalCount\n    pois {\n      geoCode\n      nameKo\n      nameEn\n      image {\n        photoURL\n      }\n      cityInfo {\n        nameKo\n        nameEn\n      }\n      countryInfo {\n        nameKo\n        nameEn\n      }\n      mainCategory\n      subCategory {\n        nameKo\n        nameEn\n      }\n      geoHierarchy {\n        continent\n        country\n        state\n        city\n      }\n      memo\n    }\n  }\n}",
    variables: {
      filterType: "popular",
      from: 0,
      size: 100,
      parentGeoCode: naverId,
    },
    operationName: "SEARCH_POI_BY_FILTER",
  });

// await fetch(url, {
//   method: "POST",
//   headers: headers,
//   body: body("JPOSA298566"),
// })
//   .then((data) => data.json())
//   .then((data) => {
//     console.log(data);
//   });

// citiesWithIndex.forEach(async (city) => {
//   await fetch(url, {
//     method: "POST",
//     headers: headers,
//     body: body(city.naverId),
//   })
//     .then((data) => data.json())
//     .then((data) => {
//       const places = data.data.poi.pois.map((place) => ({
//         geoCode: place.geoCode,
//         nameKo: place.nameKo,
//         nameEn: place.nameEn,
//         category: place.mainCategory,
//         image: place.image?.photoURL ?? "",
//         cityId: city.index,
//       }));
//       console.log(places);
//       console.log(",");
//     });
//   await new Promise((resolve) => setTimeout(resolve, 500));
// });

let count = 0; // 카운터 변수 초기화

console.log(citiesWithIndex.length);

const intervalId = setInterval(async () => {
  count++;
  const city = citiesWithIndex[count];

  await fetch(url, {
    method: "POST",
    headers: headers,
    body: body(city.naverId),
  })
    .then((data) => data.json())
    .then((data) => {
      const places =
        data.data.poi?.pois?.map((place) => ({
          geoCode: place.geoCode,
          nameKo: place.nameKo,
          nameEn: place.nameEn,
          category: place.mainCategory,
          image: place.image?.photoURL ?? "",
          cityId: city.index,
        })) ?? [];
      console.log(places);
      console.log(",");
    });
  if (count >= 404) {
    clearInterval(intervalId); // 404번 출력 후 interval 정지
  }
}, 1000);
