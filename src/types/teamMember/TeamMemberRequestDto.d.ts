export type AcceptTeamMemberReqDto = {
  teamIdx: number;
  teamMemberIdx: number;
  memberIdx: number;
};

export type AcceptTeamMembersReqDto = {
  teamIdx: number;
  memberIdx: number;
};

export type ChangeOwnerReqDto = {
  teamIdx: number;
  curOwnerIdx: number;
  newOwnerIdx: number;
};

export type JoinTeamMemberReq = {
  memberIdx: number;
  teamIdx: number;
};

export type RejectTeamMembersReqDto = {
  teamIdx: number;
  memberIdx: number;
};

export type TeamMembersReqDto = {
  teamIdx: number;
};
