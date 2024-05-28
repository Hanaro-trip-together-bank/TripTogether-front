import { useEffect, useState } from "react";
import { HStack, VStack } from "../../components/common/Stack";
import NavigationBar from "../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../contexts/useNavigation";
import Keypad from "../../components/common/Modals/Keypad";
import cn from "../../utils/cn";
import usePassword from "../../hooks/usePassword";
import Check from "../../components/common/Check";
import useToggle from "../../hooks/useToggle";

interface LoginPageProps {
  onLoginDone: () => void;
}

function LoginPage({ onLoginDone }: LoginPageProps) {
  const { back } = useNavigation();
  const { password, append, remove } = usePassword();
  const [autoLogin, toggleAutoLogin] = useToggle();
  useEffect(() => {
    if (password.length == 6) {
      // TODO: 로그인 로직
      onLoginDone();
      back();
    }
  }, [onLoginDone, back, password]);
  return (
    <VStack className="h-full justify-between">
      <NavigationBar title={""} disableHome white />
      <VStack className="w-full items-center">
        <span className="text-white text-xl mb-8"> 간편비밀번호 입력 </span>
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
        <HStack className="gap-2 text-gray-500 text-sm mb-4">
          <span className="underline">비밀번호 초기화</span>
          <span className="">|</span>
          <span className="underline">다른 로그인방법</span>
        </HStack>
        <HStack className="items-center text-gray-500 gap-2">
          <Check checked={autoLogin} onClick={toggleAutoLogin} />
          <span>자동 로그인</span>
        </HStack>
        {/* TODO: 체크, 자동로그인, (?) */}
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
  );
}

export default LoginPage;
