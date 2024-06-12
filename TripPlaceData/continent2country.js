import { continents } from "./continents";

const url = "https://travelsearch-api.naver.com/graphql";
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const body = (continent) =>
  JSON.stringify({
    query: `query GEO_NAVI($continentType: String!) {
   geoNavi(continentType: $continentType) {
     nameKo
     nameEn
     naverId
     geoType
     geoViewType
     countryGeoId
     showAsRoot
     image {
       photoURL
     }
     flagThumbnail
   }
 }`,
    variables: { continentType: continent },
    operationName: "GEO_NAVI",
  });

console.log("{");
continents.map((continent) => {
  fetch(url, {
    method: "POST",
    headers: headers,
    body: body(continent),
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(`"${continent}": [`);
      data.data.geoNavi.forEach((data) => {
        console.log({
          nameEn: data.nameEn,
          nameKo: data.nameKo,
          naverId: data.naverId,
          countryGeoId: data.countryGeoId,
          image: data.flagThumbnail,
        });
        console.log(",");
      });
      console.log("]");
      console.log(",");
    });
});
