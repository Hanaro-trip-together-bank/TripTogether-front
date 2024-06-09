/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import NavigationBar from "../../components/common/TopBars/NavigationBar";
import { LoginResDto } from "../../types/member/MemberResponseDto";
import { LoginReqDto } from "../../types/member/MemberRequestDto";
import { HStack, VStack } from "../../components/common/Stack";
import { useFetchTrigger } from "../../hooks/useFetchTrigger";
import { useNavigation } from "../../contexts/useNavigation";
import Loading from "../../components/common/Modals/Loading";
import Keypad from "../../components/common/Modals/Keypad";
import usePassword from "../../hooks/usePassword";
import Check from "../../components/common/Check";
import { LoginURL } from "../../utils/urlFactory";
import { useAuth } from "../../contexts/useAuth";
import useToggle from "../../hooks/useToggle";
import { useEffect } from "react";
import cn from "../../utils/cn";

interface LoginPageProps {}

function LoginPage({}: LoginPageProps) {
  const { back } = useNavigation();
  const { password, append, remove, clear } = usePassword();
  const [autoLogin, toggleAutoLogin] = useToggle();
  const { member, login } = useAuth();

  const { isLoading, data, trigger } = useFetchTrigger<
    LoginReqDto,
    LoginResDto
  >(LoginURL(), "POST");

  //비밀번호 6글자 되면 로그인 트리거
  useEffect(() => {
    if (password.length == 6 && localStorage.getItem("fcmToken")) {
      const loginReqtDto: LoginReqDto = {
        memberIdx: member.memberIdx,
        memberLoginPw: password,
        fcmToken: localStorage.getItem("fcmToken"),
      };
      trigger(loginReqtDto);
    }
  }, [password]);

  //데이터 채워지면 콜백
  useEffect(() => {
    if (!data) return;
    clear();
    if (data.message == "비밀번호가 맞지 않습니다.") return;
    login(data.memberName);
    back();
  }, [data]);

  return (
    <>
      <VStack className="justify-between h-full">
        <NavigationBar title={""} disableHome white />
        <VStack className="items-center w-full">
          <span className="mb-8 text-xl text-white"> 간편비밀번호 입력 </span>
          <HStack className="gap-4 mb-8">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className={cn(
                  "w-4 h-4 rounded-full border border-gray-400",
                  password.length > index ? "bg-gray-400" : ""
                )}
              />
            ))}
          </HStack>
          <HStack className="gap-2 mb-4 text-sm text-gray-500">
            <span className="underline">비밀번호 초기화</span>
            <span className="">|</span>
            <span className="underline">다른 로그인방법</span>
          </HStack>
          <HStack className="items-center gap-2 text-gray-500">
            <Check checked={autoLogin} onClick={toggleAutoLogin} />
            <span>자동 로그인</span>
          </HStack>
        </VStack>
        <Keypad
          type={2}
          onAppend={append}
          onRemove={remove}
          onAdd={() => {}}
          onClear={() => {}}
          onDone={() => {}}
        />
      </VStack>
      <Loading show={isLoading} label="로그인 중 ..." />
    </>
  );
}

export default LoginPage;
