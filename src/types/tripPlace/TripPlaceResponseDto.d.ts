import { PlaceResDto } from "../Place";

export type TripPlaceResDto = {
  tripPlaceIdx: number;
  tripDate: number;
  placeOrder: number;
  place: PlaceResDto | null;
  placeAmount: number;
  placeMemo: string;
  replyCount: number;
};
