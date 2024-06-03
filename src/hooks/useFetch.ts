/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useToggle from "./useToggle";
import { useCommunicationBlock } from "../contexts/useCommunicationBlock";
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

// const { data, error, isLoading } =  useFetch<RequestDto, ResponseDto>(uri, method, requestData)
// 화면 로드되는 즉시 페치하고 싶을 때 사용
// 통신 상태에 따라 isLoading, error, data 필드 채워짐
// 이후 useEffect를 통해 처리 로직 만들면 됨
// ex) useEffect(()=>{ if(data) alert(data) },[data]);

export function useFetch<RequestDtoType, ResponseDtoType>(
  uri: string,
  method: FetchMethod,
  requestData: RequestDtoType | null = null
) {
  const { blocked } = useCommunicationBlock();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ResponseDtoType>();
  const [trigger, toggleTrigger] = useToggle();

  useEffect(() => {
    if (blocked || !uri) return;
    const headers = { "Content-Type": "application/json" };
    const body =
      method === "POST" || method === "PUT"
        ? JSON.stringify(requestData)
        : undefined;
    const controller = new AbortController();
    const { signal } = controller;
    setIsLoading(true);
    setError("");
    (async () => {
      try {
        console.log(uri, method, body);
        const res = await fetch(uri, { method, headers, body, signal });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const json = await res.json();
        console.log(json);
        setData(json as ResponseDtoType);
        setError("");
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
      } finally {
        // setIsLoading(false);
      }
    })();
    return () => controller.abort(); //강제중지
  }, [trigger]);

  return { data, error, isLoading, refetch: toggleTrigger };
}
