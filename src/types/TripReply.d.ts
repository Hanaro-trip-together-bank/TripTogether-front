export type TripReplyReqDto = {
  teamMemberIdx: number;
  tripReplyContent: number;
};

export type TripReplyDeleteReqDto = {
  teamMemberIdx: number;
  tripReplyIdx: number;
};

export type TripReplyUpdateReqDto = {
  teamMemberIdx: number;
  tripReplyIdx: number;
  tripReplyContent: string;
};

export type TripReplyResDto = {
  tripReplyIdx: number;
  teamMemberIdx: number;
  teamMemberNickname: string;
  tripReplyContent: string;
  createdAt: string;
  lastModifiedAt: string;
};
