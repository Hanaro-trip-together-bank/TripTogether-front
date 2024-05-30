export type TripPlaceAddReqDTO ={
  trip_idx:number,
  trip_date:number,
  place_idx:number,
  place_amount:number,
  place_memo:string,
  member_id:string
};

export type TripPlaceOrderInfoReqDTO ={
  trip_place_idx:number
};

export type TripPlaceUpdateReqDTO ={
  trip_idx:number,
  place_amount:number,
  place_memo:string,
  member_id:string
};

export type TripPlaceUpdateOrderReqDTO ={
  member_id:string,
  trip_Date:number,
  orders:TripPlaceOrderInfo[]
};

export type TripPlaceResDTO ={
  trip_place_idx:number,
  trip_date:number,
  place_order:number,
  place_idx:number,
  place_amount:number,
  place_memo:string
};