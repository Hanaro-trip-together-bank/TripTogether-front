// {
//   “team_idx”:1,
//   “country_idx”: 1,
//   ”trip_name”: “hanaro”,
//   “trip_content”: “일본가자”, “trip_goal_amount”: 10000000,
//   “trip_day”: 20,
//   “trip_start_day”: “2024-07-12”
//   }

type Trip = {
  countryIds: number[];
  tripName: string;
  tripContent: string | undefined;
  tripGoalAmount: number;
  tripDay: number;
  tripStartDay: string | undefined;
};
