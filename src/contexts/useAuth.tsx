/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useCallback } from "react";
import { useContext, useState } from "react";
import { Member } from "../types/member/Member";

type AuthenticationContextProp = {
  member: Member;
  login: (name: string) => void;
  logout: () => void;
  setIdx: (memberIdx: number) => void;
};

const BLANK_FUNC = () => {};
const BLANK_MEMBER: Member = { memberIdx: 0 };

const AuthenticationContext = createContext<AuthenticationContextProp>({
  member: BLANK_MEMBER,
  login: BLANK_FUNC,
  logout: BLANK_FUNC,
  setIdx: BLANK_FUNC,
});

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [member, setMember] = useState<Member>(BLANK_MEMBER);
  const login = useCallback((name: string) => {
    setMember((member) => ({ memberIdx: member.memberIdx, memberName: name }));
  }, []);

  const logout = useCallback(
    () => setMember((member) => ({ memberIdx: member.memberIdx })),
    []
  );
  const setIdx = useCallback(
    (memberIdx: number) => setMember({ memberIdx }),
    []
  );
  return (
    <AuthenticationContext.Provider value={{ member, login, logout, setIdx }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
