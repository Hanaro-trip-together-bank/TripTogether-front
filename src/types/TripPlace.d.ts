export type TripPlaceAddReqDTO = {
  tripIdx: number;
  tripDate: number;
  placeIdx: number;
  placeAmount: number;
  placeMemo: string;
  memberIdx: number;
};

export type TripPlaceOrderInfoReqDTO = {
  tripPlaceIdx: number;
};

export type TripPlaceUpdateReqDTO = {
  tripIdx: number;
  placeAmount: number;
  placeMemo: string;
  memberIdx: number;
};

export type TripPlaceUpdateOrderReqDTO = {
  memberIdx: number;
  tripDate: number;
  orders: TripPlaceOrderInfo[];
};

export type TripPlaceResDTO = {
  tripPlaceIdx: number;
  tripDate: number;
  placeOrder: number;
  placeIdx: number;
  placeAmount: number;
  placeMemo: string;
};
