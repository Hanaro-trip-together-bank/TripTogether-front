export type DetailTeamResDto = {
  teamNotice: string;
  teamName: string;
  accNumber: string;
  accBalance: number;
  teamMemberState: string;
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
