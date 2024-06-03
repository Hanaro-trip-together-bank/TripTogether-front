export type TripResDto = {
  teamIdx: number;
  teamName: string;
  tripIdx: number;
  tripName: string;
  tripContent: string;
  tripGoalAmount: number;
  tripDay: number;
  tripImg: number;
  tripStartDay: string;
  countryIdx: number;
  countryNameKo: string;
  countryNameEng: string;
  cities: CityResDto[];
};
