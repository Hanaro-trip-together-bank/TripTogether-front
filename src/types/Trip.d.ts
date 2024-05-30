export type Trip = {
  countryIds: number[];
  tripName: string;
  tripContent: string | undefined;
  tripGoalAmount: number;
  tripDay: number;
  tripStartDay: string | undefined;
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
