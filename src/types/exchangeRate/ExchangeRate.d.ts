import ExchangeRate from "../ExchangeReate";

export type ExchangeRateReqDto = {
  code: number;
  message: string;
  data: {
    exchangeRateTime: string;
    exchangeRates: ExchangeRate[];
  };
};
