/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

type CommunicationBlockContextProp = {
  blocked: boolean;
};

const CommunicationBlockContext = createContext<CommunicationBlockContextProp>({
  blocked: false,
});

export const CommunicationBlockProvider = ({ children }: PropsWithChildren) => {
  const [blocked] = useState<boolean>(true);

  return (
    <CommunicationBlockContext.Provider value={{ blocked }}>
      {children}
    </CommunicationBlockContext.Provider>
  );
};

export const useCommunicationBlock = () =>
  useContext(CommunicationBlockContext);
