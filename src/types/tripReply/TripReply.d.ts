export type TripReplyReqDto = {
  memberIdx: number;
  tripReplyContent: string;
};

export type TripReplyDeleteReqDto = {
  memberIdx: number;
  tripReplyIdx: number;
};

export type TripReplyUpdateReqDto = {
  memberIdx: number;
  tripReplyIdx: number;
  tripReplyContent: string;
};

export type TripReplyResDto = {
  memberIdx: number;
  tripReplyIdx: number;
  teamMemberNickname: string;
  tripReplyContent: string;
  createdAt: string;
  lastModifiedAt: string;
};
