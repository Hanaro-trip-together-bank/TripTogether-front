/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import demoData from "../utils/demoData";
import replaceNumbersWithZero from "../utils/replaceNumberWithZero";
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

// const {data, error, isLoading, trigger, abort } =  useFetchTrigger<RequestDto, ResponseDto>(uri, method)
// uri와 method는 처음에 지정
// 이후 trigger(data: RequestDto)를 통해 요청
// 트리거 시 통신 상태에 따라 isLoading, error, data 필드 채워짐
// 이후 useEffect를 통해 처리 로직 만들면 됨
// ex) useEffect(()=>{ if(data) alert(data) },[data]);

export function useFetchTrigger<_RequestDtoType, ResponseDtoType>(
  uri: string,
  _method: FetchMethod
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState<string>();
  const [data, setData] = useState<ResponseDtoType>();
  const [controller] = useState(new AbortController());

  const abort = () => controller.abort();

  //데모용 trigger
  const trigger = (a: unknown = "") => {
    console.log(a);
    setIsLoading(true);
    setTimeout(() => {
      setData(demoData[replaceNumbersWithZero(uri)] as ResponseDtoType);
      setIsLoading(false);
    }, 100);
  };

  // const trigger = (requestData: RequestDtoType) => {
  //   if (isLoading) return;
  //   setIsLoading(true);
  //   const headers = { "Content-Type": "application/json" };
  //   const body =
  //     method === "POST" || method === "PUT" || method === "DELETE"
  //       ? JSON.stringify(requestData)
  //       : undefined;
  //   const { signal } = controller;
  //   (async () => {
  //     try {
  //       console.log(uri, method, body);
  //       const res = await fetch(uri, {
  //         method,
  //         body,
  //         signal,
  //         headers,
  //       });
  //       if (!res.ok) throw new Error(`Error: ${res.status}`);
  //       const json = await res.json();
  //       console.log(json);
  //       setData(json as ResponseDtoType);
  //       setError(undefined);
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         console.log(error.message);
  //         setError(error.message ?? "");
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // };

  return { data, isLoading, error, trigger, abort };
}
