import { useState } from "react";
import Arrow from "../../../components/common/Arrow";
import Button from "../../../components/common/Button";
import { VStack, HStack, Spacer } from "../../../components/common/Stack";
import TextArea from "../../../components/common/TextArea";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import cn from "../../../utils/cn";
import Modal from "../../../components/common/Modals/Modal";
import Keypad from "../../../components/common/Modals/Keypad";
import { printMoney } from "../../../utils/printMoney";
import useToggle from "../../../hooks/useToggle";
import { useNavigation } from "../../../contexts/useNavigation";

interface MoimDepositPageProps {}

function MoimDepositPage({}: MoimDepositPageProps) {
  const { back } = useNavigation();
  const [isAmountFocused, toggleIsAmountFocused] = useToggle();
  const [showNotice, toggleShowNotice] = useToggle();
  const [showCancelModal, toggleShowCancelModal] = useToggle();
  const [amount, setAmount] = useState<number>(0);
  const append = (number: number) => {
    setAmount(amount * 10 + number);
  };
  const remove = () => {
    setAmount(Math.floor(amount / 10));
  };
  const add = (number: number) => {
    setAmount(amount + number);
  };
  const clear = () => {
    setAmount(0);
  };

  return (
    <>
      <VStack className="min-h-full h-full bg-gray-50 pb-8">
        <NavigationBar onBack={toggleShowCancelModal} title={"입금"} />
        <VStack className="w-full h-full p-6 gap-4">
          {/* 입금계좌 */}
          <VStack>
            <span>입금계좌</span>
            <HStack className="bg-white border border-gray-300 p-2 rounded-md items-center gap-2">
              <HanaSvg />
              <VStack className="!gap-0">
                <span>하나로</span>
                <span className="text-gray-500 text-sm">123-123456-12345</span>
              </VStack>
            </HStack>
          </VStack>
          {/* 출금계좌 */}
          <VStack>
            <span>출금계좌</span>
            <HStack className="h-full bg-white border border-gray-300 p-2 rounded-md items-center gap-2">
              <VStack className="flex-grow">
                <HStack className="items-center">
                  <HanaSvg />
                  <VStack className="!gap-0">
                    <span>하나은행 통장</span>
                    <span className="text-gray-500 text-sm">
                      321-654321-54321
                    </span>
                  </VStack>
                </HStack>
                <span className="text-end text-gray-500 text-sm">
                  출금가능금액 1,000,000,000,000.0 원
                </span>
              </VStack>
              <Arrow direction="down" />
            </HStack>
          </VStack>
          {/* 금액 */}
          <VStack>
            <button onClick={toggleIsAmountFocused}>
              <VStack
                className={cn(
                  "items-start bg-white border p-2 rounded-md transition-all box-border",
                  isAmountFocused
                    ? "border-primary border-2 relative z-50"
                    : "border-gray-300"
                )}
              >
                <span className="text-sm text-gray-500"> 금액 </span>
                <HStack className="w-full justify-end">
                  <span>{amount.toLocaleString()}</span>
                  <span>원</span>
                </HStack>
              </VStack>
            </button>
            <span className="w-full text-gray-500 text-end">
              {printMoney(amount)}원
            </span>
          </VStack>
          <div className="h-4" />
          <TextArea border placeholder="입금통장표시"></TextArea>
          <HStack className="items-center">
            <span>이용안내</span>
            <button onClick={toggleShowNotice}>
              <Arrow direction={showNotice ? "up" : "down"} />
            </button>
          </HStack>
          {showNotice && (
            <VStack>
              <span className="text-sm">다른은행 출금 안내(오픈뱅킹)</span>
              <span className="text-xs font-thin">
                {"* 시스템 점검 시간 (23:30~24:30, 은행별 적용)에는 이용 불가"}
              </span>
              <span className="text-xs font-thin">
                {
                  "* 오픈뱅킹 잔여 출금한도(전 금융기관 합산 1일 1천만원) 이내에서 거래 가능"
                }
              </span>
            </VStack>
          )}
          <Spacer />
          <Button className="!w-full" roundedFull>
            다음
          </Button>
        </VStack>
      </VStack>
      <Modal
        xButton
        modalType="sheet"
        backDrop
        dark
        show={isAmountFocused}
        onClose={toggleIsAmountFocused}
      >
        <Keypad
          onAdd={add}
          onClear={clear}
          onAppend={append}
          onRemove={remove}
          onDone={toggleIsAmountFocused}
        />
      </Modal>
      <Modal
        xButton
        backDrop
        show={showCancelModal}
        onClose={toggleShowCancelModal}
      >
        <VStack className="w-72 items-center gap-4">
          <span>입금을 중단하시겠습니까?</span>
          <HStack className="w-full">
            <Button gray roundedFull onClick={toggleShowCancelModal}>
              취소
            </Button>
            <Button className="flex-grow" roundedFull onClick={back}>
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}

export default MoimDepositPage;

function HanaSvg() {
  return (
    <div className="text-primary scale-75">
      <svg fill="currentColor" width="30" height="30">
        <g transform="matrix(1.3333333,0,0,-1.3333333,-66.666576,536.66305)">
          <g id="g21">
            <g id="g23" clipPath="url(#clipPath27)">
              <g id="g595" transform="translate(66.3243,389.0586)">
                <path d="M 0,0 C -0.059,0.346 -0.152,0.681 -0.291,0.991 -0.729,1.937 -1.338,2.73 -2.254,3.264 -3.675,4.094 -5.394,4.088 -6.801,3.235 -7.437,2.851 -7.961,2.297 -8.299,1.632 -8.413,1.406 -8.506,1.17 -8.582,0.929 c -0.371,-1.178 -0.357,-2.763 0.311,-3.838 0.218,-0.352 0.533,-0.651 0.918,-0.801 0.386,-0.148 0.843,-0.133 1.19,0.093 0.448,0.288 0.527,0.841 0.444,1.331 -0.105,0.625 -0.185,1.242 0.044,1.855 0.075,0.196 0.179,0.384 0.329,0.53 0.092,0.087 0.2,0.16 0.315,0.214 0.242,0.119 0.519,0.172 0.785,0.128 0.467,-0.076 0.847,-0.436 1.055,-0.861 0.206,-0.423 0.262,-0.903 0.285,-1.374 0.097,-2.053 -0.393,-4.18 -0.916,-6.151 -0.054,-0.204 -0.11,-0.406 -0.167,-0.608 -0.046,-0.156 -0.124,-0.354 -0.026,-0.507 0.043,-0.064 0.111,-0.11 0.183,-0.139 0.305,-0.123 0.553,0.063 0.757,0.269 1.204,1.211 1.975,2.773 2.503,4.379 0.197,0.599 0.366,1.211 0.48,1.832 C 0.063,-1.868 0.152,-0.896 0,0" />
              </g>
              <g id="g599" transform="translate(74.9415,398.5479)">
                <path d="M 0,0 C 0,0.308 -0.272,0.511 -0.566,0.502 -0.863,0.49 -1.139,0.339 -1.412,0.233 c -5.295,-2.012 -11.266,-2.393 -16.846,-1.59 -0.955,0.138 -1.922,0.33 -2.882,0.48 -0.599,0.094 -1.194,0.23 -1.799,0.275 -0.516,0.04 -1.16,0.058 -1.577,-0.3 -0.55,-0.476 -0.511,-1.377 -0.199,-1.973 0.375,-0.714 1.031,-1.249 1.714,-1.657 0.663,-0.395 1.455,-0.817 2.246,-0.767 2.132,0.136 4.259,0.342 6.379,0.617 3.614,0.47 7.404,0.913 10.799,2.315 1.11,0.459 2.205,1.03 3.156,1.769 C -0.248,-0.467 0,-0.25 0,0" />
              </g>
              <g id="g603" fill="red" transform="translate(59.7559,400.3623)">
                <path d="m 0,0 c 0,-1.15 0.934,-2.082 2.084,-2.082 1.149,0 2.082,0.932 2.082,2.082 0,0.171 -0.039,0.343 -0.113,0.498 C 3.875,0.877 3.674,1.062 3.695,1.514 3.721,2.127 2.937,2.135 2.514,2.135 2.054,2.135 1.564,2.071 1.149,1.862 0.818,1.694 0.533,1.438 0.332,1.126 0.124,0.807 0.01,0.429 0.001,0.048 0,0.031 0,0.016 0,0" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
