import ExchangeRate from "../ExchangeRate";

export type ExchangeRateReqDto = {
  code: number;
  message: string;
  data: {
    exchangeRateTime: string;
    exchangeRates: ExchangeRate[];
  };
};
