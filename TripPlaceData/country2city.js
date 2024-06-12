import { countries } from "./countries.js";

const countryList = Object.keys(countries).flatMap(
  (country) => countries[country]
);

const url = "https://travelsearch-api.naver.com/graphql";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const body = (countryGeoId) =>
  JSON.stringify({
    query: `query GEO_CITIES($countryGeoId: Int!) {
          geoCities(countryGeoId: $countryGeoId) {
            naverId
            nameKo
            nameEn
            geoType
            geoViewType
            showAsRoot
            image {
              photoURL
          }
      }
    }`,
    variables: { countryGeoId: countryGeoId },
    operationName: "GEO_CITIES",
  });

console.log("{");
countryList.map((country) => {
  fetch(url, {
    method: "POST",
    headers: headers,
    body: body(country.countryGeoId),
  })
    .then((data) => data.json())
    .then((data) => {
      const cityList = data.data.geoCities;
      cityList.forEach((city) => {
        const newCity = {
          naverId: city.naverId,
          nameKo: city.nameKo,
          nameEn: city.nameEn,
          image: city.image.photoURL,
          countryGeoId: country.countryGeoId,
        };
        console.log(newCity);
        console.log(",");
      });
    });
});
