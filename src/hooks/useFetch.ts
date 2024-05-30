import { useEffect, useState } from "react";
type FetchMethod = "GET" | "POST" | "PUT" | "DELETE";

export function useFetch<RequestDtoType, ResponseDtoType>(
  uri: string,
  method: FetchMethod,
  requestData: RequestDtoType
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<ResponseDtoType>();

  useEffect(() => {
    if (!uri) return;
    setIsLoading(true);
    const headers = { "Content-Type": "application/json" };
    const body =
      method === "POST" || method === "PUT" ? JSON.stringify(requestData) : "";
    const controller = new AbortController();
    const { signal } = controller;
    (async () => {
      try {
        const res = await fetch(uri, { method, headers, body, signal });
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const json = await res.json();
        setData(json as ResponseDtoType);
        setError("");
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort(); //강제중지
  }, [method, requestData, uri]);

  return {
    data: data,
    error: error,
    isLoading: isLoading,
  };
}
