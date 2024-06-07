export type Trip = {
  teamIdx: number;
  teamName: string;
  tripName: string;
  tripContent: string | undefined;
  tripGoalAmount: number;
  tripDay: number;
  tripImg: number;
  tripStartDay: string | undefined;
  createdBy: number;
  cities: number[];
};

export type TripReqDto = {
  teamIdx: number;
  teamName: string;
  tripIdx: number;
  tripName: string;
  tripContent: string;
  tripGoalAmount: number;
  tripDay: number;
  tripImg: number;
  tripStartDay: Date;
  cities: number[];
  createdBy: number;
};

export type TripResDto = {
  teamIdx: number;
  teamName: string;
  tripIdx: number;
  tripName: string;
  tripContent: string;
  tripGoalAmount: number;
  tripDay: number;
  tripStartDay: string;
  cities: CityResDto[];
};

export type Continent = {
  continentIdx: number;
  continentNameKo: string;
  continentNameEng: string;
};
export type Country = {
  countryIdx: number;
  countryNameKo: string;
  countryNameEng: string;
  naverId: string;
  countryImg: string;
};
export type City = {
  cityIdx: number;
  countryIdx: number;
  cityNameKo: string;
  cityNameEng: string;
  naverId: string;
  cityImg: string;
};
