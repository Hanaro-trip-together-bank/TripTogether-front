import { HTMLAttributes } from "react";
import Modal from "../components/common/Modals/Modal";
import useToggle from "./useToggle";
import { HStack, VStack } from "../components/common/Stack";
import Button from "../components/common/Button";
import cn from "../utils/cn";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
  hideBackDrop?: boolean;
  modalType?: "modal" | "sheet";
}

// const { modal, triggerModal } = useModal(message, onConfirm);
// 세번째 필드로 취소 가능한지 넣을 수 있음
// 네번째 필드는 모달 모양 관련 구조체
// 맨 아래쪽에 {modal} 만 넣어주면 됨

export function useModal(
  message: string,
  onConfirm: () => void = () => {},
  cancellable: boolean = true,
  modalProps: ModalProps = {}
) {
  const [show, toggleShow] = useToggle();
  const confirm = () => {
    onConfirm();
    toggleShow();
  };
  const modal = (
    <Modal
      {...modalProps}
      backDrop={cancellable}
      xButton={cancellable}
      show={show}
      onClose={toggleShow}
    >
      <VStack
        className={cn(
          "items-center gap-8 pt-4",
          modalProps.modalType === "sheet" ? "w-full" : "w-72"
        )}
      >
        <span className={modalProps.dark ? "text-white" : ""}>{message}</span>
        <HStack className="w-full">
          {cancellable && (
            <Button gray roundedFull onClick={toggleShow}>
              취소
            </Button>
          )}
          <Button className="flex-grow" roundedFull onClick={confirm}>
            확인
          </Button>
        </HStack>
      </VStack>
    </Modal>
  );

  return { modal, triggerModal: toggleShow };
}
