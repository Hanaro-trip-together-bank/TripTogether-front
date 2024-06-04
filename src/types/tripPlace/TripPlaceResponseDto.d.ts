import { PlaceResDto } from "../Place";

export type TripPlaceResDto = {
  tripPlaceIdx: number;
  tripDate: number;
  placeOrder: number;
  place: PlaceResDto;
  placeAmount: number;
  placeMemo: string;
  replyCount: number;
};
