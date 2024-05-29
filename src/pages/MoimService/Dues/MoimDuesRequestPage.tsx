import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { HStack, Spacer, VStack } from "../../../components/common/Stack";
import useKeypadMappedNumber from "../../../hooks/useKeypadMappedNumber";
import Keypad from "../../../components/common/Modals/Keypad";
import Modal from "../../../components/common/Modals/Modal";
import Button from "../../../components/common/Button";
import useToggle from "../../../hooks/useToggle";
import "swiper/css";
import { useNavigation } from "../../../contexts/useNavigation";

interface MoimDuesRequestPageProps {
  requestees: string[];
}

function MoimDuesRequestPage({ requestees }: MoimDuesRequestPageProps) {
  const { back } = useNavigation();
  const { amount, add, append, remove, clear } = useKeypadMappedNumber();
  const [showKeypad, toggleShowKeypad] = useToggle();
  const [requested, toggleRequested] = useToggle();

  // 1: 요청할까요?
  if (!requested)
    return (
      <>
        <VStack className="min-h-full h-full bg-white pb-8">
          <NavigationBar title={"회비요청"} />
          <VStack className="w-full h-full items-center py-4 px-6">
            <img className="w-40" src={`/images/moim/money.png`} alt="money" />
            <VStack className="w-full items-start">
              <span className="text-xl font-bold pb-4">얼마씩 요청할까요?</span>
              <HStack className="font-bold">
                <button
                  className="border-b border-black"
                  onClick={toggleShowKeypad}
                >
                  <span className="text-primary">
                    {amount.toLocaleString()}원
                  </span>
                </button>
                <span>요청하기</span>
              </HStack>
            </VStack>
            <Spacer />
            <Button
              className="w-full"
              onClick={toggleRequested}
              disabled={amount == 0}
            >
              확인
            </Button>
          </VStack>
        </VStack>
        {/* 키패드 시트 */}
        <Modal
          xButton
          hideBackDrop
          modalType="sheet"
          backDrop
          dark
          show={showKeypad}
          onClose={toggleShowKeypad}
        >
          <Keypad
            onAdd={add}
            onClear={clear}
            onAppend={append}
            onRemove={remove}
            onDone={toggleShowKeypad}
          />
        </Modal>
      </>
    );

  // 2: 요청했어요
  if (requested)
    return (
      <>
        <VStack className="min-h-full h-full bg-white pb-8">
          <NavigationBar title={"회비요청 완료"} />
          <VStack className="h-full py-4 px-6">
            <HStack className="w-full justify-center">
              <img
                className="w-40"
                src={`/images/moim/money.png`}
                alt="money"
              />
            </HStack>
            <span className="text-xl text-center pb-4">
              <span className="font-bold">회비 입금</span>을 <br />
              요청했어요
            </span>
            <VStack className="w-full my-4 py-4 border-y border-gray-200">
              <DuesRequestConfirmRow label={"모임이름"} value={"하나로"} />
              <DuesRequestConfirmRow
                label={"모임대상"}
                value={requestees.join(", ")}
              />
              <DuesRequestConfirmRow
                label={"요청금액"}
                value={amount.toLocaleString() + "원"}
              />
            </VStack>
            <Spacer />
            <Button className="w-full" onClick={back}>
              확인
            </Button>
          </VStack>
        </VStack>
        {/* 키패드 시트 */}
        <Modal
          xButton
          hideBackDrop
          modalType="sheet"
          backDrop
          dark
          show={showKeypad}
          onClose={toggleShowKeypad}
        >
          <Keypad
            onAdd={add}
            onClear={clear}
            onAppend={append}
            onRemove={remove}
            onDone={toggleShowKeypad}
          />
        </Modal>
      </>
    );
}

export default MoimDuesRequestPage;

// 입금 요청 확인 내역 행
function DuesRequestConfirmRow({
  label,
  value,
  value2,
}: {
  label: string;
  value: string;
  value2?: string;
}) {
  return (
    <HStack className="w-full justify-between items-center">
      <span className="font-thin text-nowrap">{label}</span>
      <VStack className="items-end text-end !gap-0">
        <span>{value}</span>
        {value2 && <span>{value2}</span>}
      </VStack>
    </HStack>
  );
}
