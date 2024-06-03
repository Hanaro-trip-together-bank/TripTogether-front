export type DueRuleReqDto = {
  teamIdx: number;
};

export type DueRuleResDto = {
  code: number;
  message: string;
  data: {
    duesDate: number;
    duesAmount: number;
  }
};

export type DueMember = {
  memberIdx: number;
  memberName: string;
  memberAmount: number;
};

export type DueMemStatusResDto = {
  code: number;
  message: string;
  data: {
    duesTotalAmount: number | null;
    memberResponseDtos: DueMember[];
  }
};