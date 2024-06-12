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
