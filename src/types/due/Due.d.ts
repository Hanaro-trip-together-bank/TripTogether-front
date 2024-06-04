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

export type DueRuleSetReqDto = {
  teamIdx: number;
  duesDate: number;
  duesAmount: number;
};

export type DueRuleSetResDto = {
  code: number;
  message: string;
  data: null;
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