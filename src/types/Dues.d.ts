export type DuesRequestDto = {
  teamIdx: number;
  duesAmount: number;
  memberInfos: memberInfoDto[];
};

export type memberInfoDto = {
  memberIdx: number;
};
