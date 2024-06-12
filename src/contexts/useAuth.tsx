/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useContext, useState } from "react";
import { Member } from "../types/member/Member";

type AuthenticationContextProp = {
  member: Member;
  login: (name: string) => void;
  logout: () => void;
  setIdx: (memberIdx: number) => void;
};

const SKEY = "HanaroTripSession";
const BLANK_FUNC = () => {};
const BLANK_MEMBER: Member = { memberIdx: 1 };

const AuthenticationContext = createContext<AuthenticationContextProp>({
  member: BLANK_MEMBER,
  login: BLANK_FUNC,
  logout: BLANK_FUNC,
  setIdx: BLANK_FUNC,
});

function getStorage(): Member {
  try {
    const storedData = localStorage.getItem(SKEY);
    if (storedData) return JSON.parse(storedData) as Member;
  } catch (error) {
    console.error("로컬 스토리지의 데이터를 불러오는 데 실패했습니다: ", error);
  }
  return BLANK_MEMBER;
}

function setStorage(member: Member) {
  try {
    localStorage.setItem(SKEY, JSON.stringify(member));
  } catch (error) {
    console.error("로컬 스토리지에 데이터를 설정하는 데 실패했습니다: ", error);
  }
}

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const [member, setMember] = useState<Member>(getStorage());
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
  useEffect(() => {
    setStorage(member);
  }, [member]);
  return (
    <AuthenticationContext.Provider value={{ member, login, logout, setIdx }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
