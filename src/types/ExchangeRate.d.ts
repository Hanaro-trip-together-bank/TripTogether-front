export type ExchangeRate = {
  curCode: string;
  curName: string;
  curIcon: string;
  curRate: string;
};

export type ExchangeRateAlarm = {
  idx: number;
  curCode: string;
  curName: string;
  curIcon: string;
  curRate: number;
  curType: string;
};

export type OverLessType = {
  nameKo: string;
  value: string;
};

export type ExchangeRateAlarmsResponse = {
  code: number;
  message: string;
  data: ExchangeRateAlarm[];
};

export type ExchangeRateCreateRequest = {
  memberIdx: number;
  curCode: string;
  curRate: string;
  rateAlarmType: string;
};

export type ExchangeRateCreateResponse = {
  code: string;
  message: string;
  data: null;
};
