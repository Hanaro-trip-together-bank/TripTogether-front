export type UpdateAccBalanceReq = {
  depositAccIdx: number;
  withdrawAccIdx: number;
  amount: number;
  memo: string;
};

export type AccountsReqDto = {
  memberIdx: number;
};
