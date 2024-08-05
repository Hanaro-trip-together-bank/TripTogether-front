// eslint-disable-next-line @typescript-eslint/no-explicit-any
const demoData: { [key: string]: any } = {
  "demoData/login": {
    message: "로그인이 완료되었습니다!",
    memberName: "최지웅",
  },
  "demoData/trips": {},
  "demoData/trips/0": {
    teamIdx: 1,
    teamName: "하나로헤쳐모아",
    tripIdx: 1,
    tripName: "여행",
    tripContent: "content",
    tripGoalAmount: 5000.0,
    tripDay: 3,
    tripStartDay: "2024-10-11",
    cities: [
      {
        cityIdx: 224,
        countryIdx: 191,
        cityNameKo: "마이애미",
        cityNameEng: "Miami",
        naverId: "US276287",
        cityImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023122517301_G9J8MJXSC.jpg/fb190_3_i1.jpg?type=w540_fst",
      },
      {
        cityIdx: 225,
        countryIdx: 191,
        cityNameKo: "시카고",
        cityNameEng: "Chicago",
        naverId: "US276288",
        cityImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201023122018219_E2M5O5EN2.jpg/fb189_3_i1.jpg?type=w540_fst",
      },
    ],
  },
  "demoData/continents": [
    {
      continentIdx: 1,
      continentNameKo: "유럽",
      continentNameEng: "Europe",
    },
    {
      continentIdx: 2,
      continentNameKo: "동남아",
      continentNameEng: "Southeast Asia",
    },
    {
      continentIdx: 3,
      continentNameKo: "중남미",
      continentNameEng: "Central and South America",
    },
    {
      continentIdx: 4,
      continentNameKo: "동북아",
      continentNameEng: "Northeast Asia",
    },
    {
      continentIdx: 5,
      continentNameKo: "오세아니아/남태평양",
      continentNameEng: "Oceania/South Pacific",
    },
    {
      continentIdx: 6,
      continentNameKo: "중동/아프리카",
      continentNameEng: "Middle East/Africa",
    },
    {
      continentIdx: 7,
      continentNameKo: "서남아시아",
      continentNameEng: "Southwest Asia",
    },
    {
      continentIdx: 8,
      continentNameKo: "북미/하와이",
      continentNameEng: "North America/Hawaii",
    },
    {
      continentIdx: 9,
      continentNameKo: "러시아/중앙아시아",
      continentNameEng: "Russia/Central Asia",
    },
  ],

  "demoData/countries": [
    {
      countryIdx: 1,
      countryNameKo: "일본",
      countryNameEng: "Japan",
    },
    {
      countryIdx: 2,
      countryNameKo: "대한민국",
      countryNameEng: "Korea",
    },
  ],

  "demoData/countries/continents/0": [
    {
      countryIdx: 293730,
      countryNameKo: "모로코",
      countryNameEng: "Morocco",
      naverId: "MA293730",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174550979_S6C8UAWHJ.png/133_m.png?type=m1500",
    },
    {
      countryIdx: 293738,
      countryNameKo: "세이셸",
      countryNameEng: "Seychelles",
      naverId: "SC353293738",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174554339_DQOFBN7Y5.png/42_m.png?type=m1500",
    },
    {
      countryIdx: 293740,
      countryNameKo: "남아프리카공화국",
      countryNameEng: "South Africa",
      naverId: "ZA293740",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174549140_VKML8JKH6.png/145_m.png?type=m1500",
    },
    {
      countryIdx: 293747,
      countryNameKo: "탄자니아",
      countryNameEng: "Tanzania",
      naverId: "TZ293747",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174550411_RGMGRU3XM.png/24_m.png?type=m1500",
    },
    {
      countryIdx: 293790,
      countryNameKo: "에티오피아",
      countryNameEng: "Ethiopia",
      naverId: "ET293790",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174556091_LDD49CGSB.png/137_m.png?type=m1500",
    },
    {
      countryIdx: 293816,
      countryNameKo: "모리셔스",
      countryNameEng: "Mauritius",
      naverId: "MU194293816",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174551881_T6E0YIUL6.png/33_m.png?type=m1500",
    },
    {
      countryIdx: 293977,
      countryNameKo: "이스라엘",
      countryNameEng: "Israel",
      naverId: "IL293977",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174552797_9HOKZ4QPC.png/185_m.png?type=m1500",
    },
    {
      countryIdx: 293985,
      countryNameKo: "요르단",
      countryNameEng: "Jordan",
      naverId: "JO293985",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174552241_UBFABNLYZ.png/190_m.png?type=m1500",
    },
    {
      countryIdx: 294008,
      countryNameKo: "카타르",
      countryNameEng: "Qatar",
      naverId: "QA294008",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174552862_ASFVMQH9K.png/80_m.png?type=m1500",
    },
    {
      countryIdx: 294012,
      countryNameKo: "아랍에미리트",
      countryNameEng: "United Arab Emirates",
      naverId: "AE294012",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174551494_KO7D8QC0X.png/120_m.png?type=m1500",
    },
    {
      countryIdx: 294200,
      countryNameKo: "이집트",
      countryNameEng: "Egypt",
      naverId: "EG294200",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174556222_SM7YGEC46.png/135_m.png?type=m1500",
    },
    {
      countryIdx: 294206,
      countryNameKo: "케냐",
      countryNameEng: "Kenya",
      naverId: "KE294206",
      countryImg:
        "https://search.pstatic.net/common?src=http://dbscthumb.phinf.naver.net/1230_000_1/20120625174548427_2VETGDBMT.png/131_m.png?type=m1500",
    },
  ],

  "demoData/cities": [
    {
      cityIdx: 283,
      countryIdx: 293915,
      cityNameKo: "방콕",
      cityNameEng: "Bangkok",
      naverId: "BKBKK187047",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_6/20200830224429423_VTY2XTM2C.jpg/fb126_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 310,
      countryIdx: 293915,
      cityNameKo: "치앙라이",
      cityNameEng: "Chiang Rai",
      naverId: "THCEI293918",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_15/20211129163235927_B5EIA56T1.jpg/fb486_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 311,
      countryIdx: 293915,
      cityNameKo: "푸켓",
      cityNameEng: "Phuket",
      naverId: "THHKT293917",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_13/20210331141136110_43PXZWSXT.jpg/fb381_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 312,
      countryIdx: 293915,
      cityNameKo: "끄라비",
      cityNameEng: "Krabi",
      naverId: "THKBI293916",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201020150523238_Q52RGD5K3.jpg/fb233_3_i1.jpg?type=w540_fst",
    },
  ],
  "demoData/cities/countries/0": [
    {
      cityIdx: 283,
      countryIdx: 293915,
      cityNameKo: "방콕",
      cityNameEng: "Bangkok",
      naverId: "BKBKK187047",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_6/20200830224429423_VTY2XTM2C.jpg/fb126_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 310,
      countryIdx: 293915,
      cityNameKo: "치앙라이",
      cityNameEng: "Chiang Rai",
      naverId: "THCEI293918",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_15/20211129163235927_B5EIA56T1.jpg/fb486_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 311,
      countryIdx: 293915,
      cityNameKo: "푸켓",
      cityNameEng: "Phuket",
      naverId: "THHKT293917",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_13/20210331141136110_43PXZWSXT.jpg/fb381_3_i1.jpg?type=w540_fst",
    },
    {
      cityIdx: 312,
      countryIdx: 293915,
      cityNameKo: "끄라비",
      cityNameEng: "Krabi",
      naverId: "THKBI293916",
      cityImg:
        "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201020150523238_Q52RGD5K3.jpg/fb233_3_i1.jpg?type=w540_fst",
    },
  ],

  "demoData/places/categories/0": [
    {
      placeIdx: 1,
      cityIdx: 1,
      placeNameKo: "도쿄 스카이 트리",
      placeNameEng: "Tokyo Skytree",
      placeImg:
        "https://dbscthumb-phinf.pstatic.net/5885_000_7/20200924222854348_L9WX8HQO2.jpg/fb176_138_i1.jpg?type=w540_fst",
      categoryIdx: 1,
    },
    {
      placeIdx: 2,
      cityIdx: 1,
      placeNameKo: "도쿄 장소2",
      placeNameEng: "Tokyo 2",
      placeImg:
        "https://dbscthumb-phinf.pstatic.net/5885_000_7/20200924222854348_L9WX8HQO2.jpg/fb176_138_i1.jpg?type=w540_fst",
      categoryIdx: 1,
    },
  ],

  "demoData/places?category_id=0&city_id=0": [
    {
      placeIdx: 1,
      cityIdx: 1,
      placeNameKo: "도쿄 스카이 트리",
      placeNameEng: "Tokyo Skytree",
      placeImg:
        "https://dbscthumb-phinf.pstatic.net/5885_000_7/20200924222854348_L9WX8HQO2.jpg/fb176_138_i1.jpg?type=w540_fst",
      categoryIdx: 1,
    },
    {
      placeIdx: 2,
      cityIdx: 1,
      placeNameKo: "도쿄 장소2",
      placeNameEng: "Tokyo 2",
      placeImg:
        "https://dbscthumb-phinf.pstatic.net/5885_000_7/20200924222854348_L9WX8HQO2.jpg/fb176_138_i1.jpg?type=w540_fst",
      categoryIdx: 1,
    },
  ],
  "demoData/trips/teams/0": {
    preferTripIdx: 21,
    trips: [
      {
        teamIdx: 2,
        teamName: "등산 동호회",
        tripIdx: 20,
        tripName: "등산투어",
        tripContent: "여행 떠나보자",
        tripGoalAmount: 360000.0,
        tripDay: 10,
        tripImg: 2,
        tripStartDay: "2023-12-31",
        countryIdx: null,
        countryNameKo: null,
        countryNameEng: null,
        cities: [
          {
            cityIdx: 283,
            countryIdx: 293915,
            cityNameKo: "방콕",
            cityNameEng: "Bangkok",
            naverId: "BKBKK187047",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_6/20200830224429423_VTY2XTM2C.jpg/fb126_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 310,
            countryIdx: 293915,
            cityNameKo: "치앙라이",
            cityNameEng: "Chiang Rai",
            naverId: "THCEI293918",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_15/20211129163235927_B5EIA56T1.jpg/fb486_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 311,
            countryIdx: 293915,
            cityNameKo: "푸켓",
            cityNameEng: "Phuket",
            naverId: "THHKT293917",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_13/20210331141136110_43PXZWSXT.jpg/fb381_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 312,
            countryIdx: 293915,
            cityNameKo: "끄라비",
            cityNameEng: "Krabi",
            naverId: "THKBI293916",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201020150523238_Q52RGD5K3.jpg/fb233_3_i1.jpg?type=w540_fst",
          },
        ],
      },
      {
        teamIdx: 2,
        teamName: "등산 동호회",
        tripIdx: 21,
        tripName: "에베레스트",
        tripContent: "완주합시다.",
        tripGoalAmount: 999999.0,
        tripDay: 3,
        tripImg: null,
        tripStartDay: "2024-12-31",
        countryIdx: null,
        countryNameKo: null,
        countryNameEng: null,
        cities: [
          {
            cityIdx: 283,
            countryIdx: 293915,
            cityNameKo: "방콕",
            cityNameEng: "Bangkok",
            naverId: "BKBKK187047",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_6/20200830224429423_VTY2XTM2C.jpg/fb126_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 310,
            countryIdx: 293915,
            cityNameKo: "치앙라이",
            cityNameEng: "Chiang Rai",
            naverId: "THCEI293918",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_15/20211129163235927_B5EIA56T1.jpg/fb486_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 311,
            countryIdx: 293915,
            cityNameKo: "푸켓",
            cityNameEng: "Phuket",
            naverId: "THHKT293917",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_13/20210331141136110_43PXZWSXT.jpg/fb381_3_i1.jpg?type=w540_fst",
          },
          {
            cityIdx: 312,
            countryIdx: 293915,
            cityNameKo: "끄라비",
            cityNameEng: "Krabi",
            naverId: "THKBI293916",
            cityImg:
              "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_9/20201020150523238_Q52RGD5K3.jpg/fb233_3_i1.jpg?type=w540_fst",
          },
        ],
      },
    ],
  },
  "demoData/trips/place/0": [
    {
      tripPlaceIdx: 12,
      tripDate: 1,
      placeOrder: 1,
      place: {
        placeIdx: 16103,
        cityIdx: 225,
        placeNameKo: "아크슬라 산 전망대",
        placeNameEng: "Aksla Mountain",
        placeImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200910133125374_BVHQMZ14K.jpg/fb134_18_i1.jpg?type=w540_fst",
        categoryIdx: 1,
      },
      placeAmount: 0.0,
      placeMemo: "전망대 구경 후 점심식사",
      replyCount: 0,
    },
    {
      tripPlaceIdx: 12,
      tripDate: 1,
      placeOrder: 2,
      place: {
        placeIdx: 16103,
        cityIdx: 225,
        placeNameKo: "아크슬라 산 전망대",
        placeNameEng: "Aksla Mountain",
        placeImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200910133125374_BVHQMZ14K.jpg/fb134_18_i1.jpg?type=w540_fst",
        categoryIdx: 1,
      },
      placeAmount: 0.0,
      placeMemo: "전망대 구경 후 점심식사",
      replyCount: 0,
    },
    {
      tripPlaceIdx: 12,
      tripDate: 2,
      placeOrder: 1,
      place: {
        placeIdx: 16103,
        cityIdx: 225,
        placeNameKo: "아크슬라 산 전망대",
        placeNameEng: "Aksla Mountain",
        placeImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200910133125374_BVHQMZ14K.jpg/fb134_18_i1.jpg?type=w540_fst",
        categoryIdx: 1,
      },
      placeAmount: 0.0,
      placeMemo: "전망대 구경 후 점심식사",
      replyCount: 0,
    },
    {
      tripPlaceIdx: 12,
      tripDate: 2,
      placeOrder: 2,
      place: {
        placeIdx: 16103,
        cityIdx: 225,
        placeNameKo: "아크슬라 산 전망대",
        placeNameEng: "Aksla Mountain",
        placeImg:
          "https://search.pstatic.net/common?src=https://dbscthumb-phinf.pstatic.net/5885_000_5/20200910133125374_BVHQMZ14K.jpg/fb134_18_i1.jpg?type=w540_fst",
        categoryIdx: 1,
      },
      placeAmount: 0.0,
      placeMemo: "전망대 구경 후 점심식사",
      replyCount: 0,
    },
  ],
  "demoData/trips/place/info/0": {},

  "demoData/trips/place/0/reply": [
    {
      tripReplyIdx: 1,
      teamMemberIdx: 1,
      memberIdx: 1,
      teamMemberNickname: "Alice",
      tripReplyContent: "Looking forward to this!",
      createdAt: "2023-06-01T10:00:00",
      lastModifiedAt: "2023-06-01T11:00:00",
    },
    {
      tripReplyIdx: 2,
      memberIdx: 2,
      teamMemberIdx: 2,
      teamMemberNickname: "Bob",
      tripReplyContent: "Can we reschedule?",
      createdAt: "2023-06-02T10:00:00",
      lastModifiedAt: "2023-06-02T11:00:00",
    },
    {
      tripReplyIdx: 3,
      memberIdx: 1,
      teamMemberIdx: 1,
      teamMemberNickname: "Alice",
      tripReplyContent: "Excited about the trip!",
      createdAt: "2023-06-03T10:00:00",
      lastModifiedAt: "2023-06-03T11:00:00",
    },
  ],
  "demoData/categories": [
    {
      categoryIdx: 1,
      categoryNameKo: "관광명소",
    },
    {
      categoryIdx: 2,
      categoryNameKo: "쇼핑",
    },
    {
      categoryIdx: 3,
      categoryNameKo: "식당",
    },
  ],

  "demoData/dues/rule/0": {
    duesDate: "1",
    duesAmount: 10000.0,
  },

  "demoData/dues?paid=false&date=0-0&accIdx=0&teamIdx=0": {
    data: {
      duesTotalAmount: 100000.0,
      memberResponseDtos: [
        {
          memberIdx: 1,
          memberName: "이채원",
          memberAmount: 50000,
        },
        {
          memberIdx: 2,
          memberName: "김채원",
          memberAmount: 50000,
        },
      ],
    },
  },
  "demoData/dues/rule": {},

  "demoData/dues/details/0/total-amount?memberIdx=0": {
    data: {
      duesTotalAmount: 100000.0,
      memberResponseDtos: [
        {
          memberIdx: 1,
          memberName: "이채원",
          memberAmount: 50000,
        },
        {
          memberIdx: 2,
          memberName: "김채원",
          memberAmount: 50000,
        },
      ],
    },
  },
  "demoData/dues/details/0?memberIdx=0&duesYear=0": [
    {
      duesAmount: 1000.0,
      duesOfMonth: 5,
    },
  ],
  "demoData/team": [
    {
      teamMemberIdx: 1,
      memberName: "임유빈",
      teamMemberState: "총무",
      memberIdx: 1,
    },
    {
      teamMemberIdx: 2,
      memberName: "김하나",
      teamMemberState: "모임원",
      memberIdx: 2,
    },
  ],
  "demoData/team/invite-team": "",
  "demoData/team/change-owner": {},
  "demoData/team/accept-all": {},
  "demoData/team/reject-one": {},
  "demoData/team/accept-one": {},
  "demoData/team/members": {},
  "demoData/team/member": {},

  "demoData/team/team": {},

  "demoData/dues/request": {},

  "demoData/team/preference": {},

  //------------------- 내 모임 --------------------------
  "demoData/account": [
    {
      accIdx: 1,
      accNumber: "12345678",
      accBalance: 999999999.0,
      teamName: "하나로헤쳐모아",
      teamIdx: 1,
      teamMemberIdx: 1,
    },
    {
      accIdx: 2,
      accNumber: "61349242",
      accBalance: 100000.0,
      teamName: "등산 동호회",
      teamIdx: 2,
      teamMemberIdx: 6,
    },
  ],
  "demoData/account/detail": {
    teamNotice: "돈 안내면 커피쏘기",
    teamName: "하나로헤쳐모아",
    accNumber: "95135892566249",
    accBalance: 240000.0,
    teamMemberState: "모임원",
    preferTripIdx: 34,
    teamMemberCount: 3,
  },
  "demoData/account/deposit": {},
  "demoData/accounts": [
    {
      accIdx: 1,
      accNumber: "102-979532-53437",
      accName: "영하나플러스통장",
      accBalance: 500000,
    },
    {
      accIdx: 2,
      accNumber: "103-426852-17532",
      accName: "하나보통통장",
      accBalance: 300000,
    },
  ],
  "demoData/account/add": {},

  "demoData/account/set": {
    teamName: "푸꾸옥가자",
    accNumber: "102-979532-53437",
    accBalance: 500000,
    alarmStatus: true,
    accIdx: 1,
  },
  "demoData/account/alarm": {},

  "demoData/account/notice": {},
  "demoData/team/join": {},
  "demoData/exchange-rate": {
    code: 200,
    message: "OK",
    data: {
      exchangeRateTime: "2024-06-10 11:02",
      exchangeRates: [
        {
          curCode: "AED",
          curName: "아랍에미리트 디르함",
          curIcon: "🇸🇩",
          curRate: "373.40",
        },
        {
          curCode: "AUD",
          curName: "호주 달러",
          curIcon: "🇳🇿",
          curRate: "914.79",
        },
        {
          curCode: "BHD",
          curName: "바레인 디나르",
          curIcon: "🇧🇭",
          curRate: "3638.03",
        },
        {
          curCode: "BND",
          curName: "브루나이 달러",
          curIcon: "🇧🇳",
          curRate: "1019.40",
        },
        {
          curCode: "CAD",
          curName: "캐나다 달러",
          curIcon: "🇨🇦",
          curRate: "1003.44",
        },
        {
          curCode: "CHF",
          curName: "스위스 프랑",
          curIcon: "🇨🇭",
          curRate: "1541.88",
        },
        {
          curCode: "CNH",
          curName: "위안화",
          curIcon: "🇨🇳",
          curRate: "188.96",
        },
        {
          curCode: "DKK",
          curName: "덴마아크 크로네",
          curIcon: "🇩🇰",
          curRate: "200.26",
        },
        {
          curCode: "EUR",
          curName: "유로",
          curIcon: "🇪🇺",
          curRate: "1493.91",
        },
        {
          curCode: "GBP",
          curName: "영국 파운드",
          curIcon: "🇬🇧",
          curRate: "1754.63",
        },
        {
          curCode: "HKD",
          curName: "홍콩 달러",
          curIcon: "🇭🇰",
          curRate: "175.62",
        },
        {
          curCode: "IDR(100)",
          curName: "인도네시아 루피아",
          curIcon: "🇮🇩",
          curRate: "8.43",
        },
        {
          curCode: "JPY(100)",
          curName: "일본 옌",
          curIcon: "🇯🇵",
          curRate: "881.54",
        },
        {
          curCode: "KRW",
          curName: "한국 원",
          curIcon: "🇰🇷",
          curRate: "1.00",
        },
        {
          curCode: "KWD",
          curName: "쿠웨이트 디나르",
          curIcon: "🇰🇼",
          curRate: "4476.17",
        },
        {
          curCode: "MYR",
          curName: "말레이지아 링기트",
          curIcon: "🇲🇾",
          curRate: "292.18",
        },
        {
          curCode: "NOK",
          curName: "노르웨이 크로네",
          curIcon: "🇳🇴",
          curRate: "129.96",
        },
        {
          curCode: "NZD",
          curName: "뉴질랜드 달러",
          curIcon: "🇳🇿",
          curRate: "850.26",
        },
        {
          curCode: "SAR",
          curName: "사우디 리얄",
          curIcon: "🇸🇦",
          curRate: "365.68",
        },
        {
          curCode: "SEK",
          curName: "스웨덴 크로나",
          curIcon: "🇸🇪",
          curRate: "132.02",
        },
        {
          curCode: "SGD",
          curName: "싱가포르 달러",
          curIcon: "🇸🇬",
          curRate: "1019.40",
        },
        {
          curCode: "THB",
          curName: "태국 바트",
          curIcon: "🇹🇭",
          curRate: "37.65",
        },
        {
          curCode: "USD",
          curName: "미국 달러",
          curIcon: "🇺🇸",
          curRate: "1371.50",
        },
      ],
    },
  },
  "demoData/exchange-rate/0": {
    data: [
      {
        idx: 1,
        curCode: "EUR",
        curName: "유로",
        curIcon: "🇪🇺",
        curRate: 2001.0,
        curType: "OVER",
      },
      {
        idx: 2,
        curCode: "AED",
        curName: "아랍에미리트 디르함",
        curIcon: "🇸🇩",
        curRate: 373.4,
        curType: "LESS",
      },
    ],
  },
  "demoData/exchange-rate/0/0": {},
};
export default demoData;
