import { PlaceResDto } from "../Place";

export type TripPlaceResDTO = {
  tripPlaceIdx: number;
  tripDate: number;
  placeOrder: number;
  place: PlaceResDto;
  placeAmount: number;
  placeMemo: string;
  replyCount: number;
};
