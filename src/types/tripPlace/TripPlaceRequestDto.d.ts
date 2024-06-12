export type TripPlaceAddReqDTO = {
  tripIdx: number;
  tripDate: number;
  placeIdx: number;
  placeAmount: number;
  placeMemo: string;
  memberIdx: number;
};

export type TripPlaceUpdateReqDTO = {
  placeIdx: number;
  placeAmount: number;
  placeMemo: string;
  memberIdx: number;
};

export type TripPlaceUpdateOrderReqDTO = {
  memberIdx: number;
  newPlaces: {
    tripDate: number;
    placeOrder: number;
    placeIdx: number;
    placeAmount: number;
    placeMemo: string;
  }[];
  orders: {
    tripPlaceIdx: number;
    placeOrder: number;
    tripDate: number;
  }[];
};
