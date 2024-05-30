export type DetailTeamResDto = {
  teamIdx: number;
  teamNotice: string;
  teamName: string;
  accNumber: string;
  accBalance: number;
};

export type InviteTeamResDto = {
  inviter: string;
  teamName: string;
  teamNo: number;
};

export type ManageTeamResDto = {
  teamName: string;
  accNumber: string;
  accBalance: number;
  alarmStatus: boolean;
};
