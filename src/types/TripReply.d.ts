export type TripReplyReqDto = {
  team_member_idx:number,
  trip_reply_content:string
};

export type TripReplyDeleteReqDto = {
  team_member_idx:number,
  trip_reply_idx:number
};

export type TripReplyUpdateReqDto = {
  team_member_idx:number,
  trip_reply_idx:number,
  trip_reply_content:string
};

export type TripReplyResDto = {
  trip_reply_idx:number,
  team_member_idx:number,
  team_member_nickname:string,
  trip_reply_content:string,
  created_at:string,
  last_modified_at:string
};