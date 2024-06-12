/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { ExchangeRateGetURL } from "../utils/urlFactory";
import { ExchangeRateReqDto } from "../types/exchangeRate/ExchangeRate";

type ExchangeRateContextProp = {
  exchangeRate: ExchangeRateReqDto | undefined;
};

const BLANK_DTO: ExchangeRateReqDto = {
  code: 0,
  message: "",
  data: {
    exchangeRateTime: "",
    exchangeRates: [],
  },
};

const ExchangeRateContext = createContext<ExchangeRateContextProp>({
  exchangeRate: BLANK_DTO,
});

export const ExchangeRateProvider = ({ children }: PropsWithChildren) => {
  const { data, refetch } = useFetch<null, ExchangeRateReqDto>(
    ExchangeRateGetURL(),
    "GET"
  );
  const [exchangeRate, setExchangeRate] =
    useState<ExchangeRateReqDto>(BLANK_DTO);
  useEffect(() => {
    if (data) {
      setExchangeRate({
        code: data.code,
        message: data.message,
        data: {
          exchangeRateTime: data.data.exchangeRateTime,
          exchangeRates: data.data.exchangeRates.map((rate) => {
            const FX = { ...rate };
            if (FX.curCode.includes("100")) {
              FX.curRate = (+FX.curRate / 100).toString();
              FX.curCode = FX.curCode.replace("(100)", "");
            }
            return FX;
          }),
        },
      });
    }
  }, [data]);
  useEffect(() => {
    console.log(exchangeRate);
  }, [exchangeRate]);
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 600000); // 600000ms = 10 minutes
    // 컴포넌트가 언마운트 될 때 인터벌을 정리합니다.
    return () => clearInterval(interval);
  }, [refetch]);
  return (
    <ExchangeRateContext.Provider value={{ exchangeRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRate = () => useContext(ExchangeRateContext);
