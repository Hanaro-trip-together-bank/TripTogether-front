export type TripResDto = {
  teamIdx: number;
  teamName: string;
  tripIdx: number;
  tripName: string;
  tripContent: string;
  tripGoalAmount: number;
  tripExpectedAmount: number;
  tripDay: number;
  tripImg: number | null;
  tripStartDay: string;
  countryIdx: number;
  countryNameKo: string;
  countryNameEng: string;
  cities: CityResDto[];
};

export type TripListResDto = {
  preferTripIdx: number;
  trips: TripResDto[];
};
