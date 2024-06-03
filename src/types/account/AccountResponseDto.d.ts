export type AccountsResDto = {
  accIdx: number;
  accNumber: string;
  accName: string;
};

export type TeamServiceListResDto = {
  accIdx: number;
  accNumber: string;
  accBalance: number;
  teamName: string;
  teamIdx: number;
  teamMemberIdx: number;
  teamMemberState: string;
};
