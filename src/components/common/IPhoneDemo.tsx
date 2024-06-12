import Button from "./Button";
import NavigationBar from "./TopBars/NavigationBar";
import { HStack, VStack } from "./Stack";
import StatusBar from "./TopBars/StatusBar";
import Modal from "./Modals/Modal";
import { useState } from "react";
import Toggle from "./Toggle";
import Keypad from "./Modals/Keypad";

function IPhoneDemo() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [darkModal, setDarkModal] = useState<boolean>(false);
  const [keyPadModal, setKeyPadModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"modal" | "sheet">("modal");
  const toggleShowModal = () => {
    setShowModal((value) => !value);
  };
  const toggleDarkModal = () => {
    setDarkModal((value) => !value);
  };
  const toggleKeyPadModal = () => {
    setKeyPadModal((value) => !value);
  };
  const toggleModalType = () => {
    if (modalType == "modal") setModalType("sheet");
    else setModalType("modal");
  };
  return (
    <VStack className="relative w-iPhone h-iPhone rounded-3xl overflow-hidden border-2 border-black items-center !gap-0">
      <Modal
        show={showModal}
        modalType={modalType}
        onClose={() => setShowModal(false)}
        xButton
        dark={darkModal}
      >
        {keyPadModal ? (
          <Keypad
            type={2}
            onAppend={() => {}}
            onAdd={() => {}}
            onClear={() => {}}
            onRemove={() => {}}
            onDone={() => {}}
          />
        ) : (
          <VStack>
            <span className="text-bold text-gray-500 text-center">
              참여중인 모임이 없어요.
            </span>
            <span className="text-bold text-gray-500 pb-4 text-center">
              모임통장 서비스를 이용하시겠어요?
            </span>
            <HStack>
              <Button gray>취소</Button>
              <Button className="flex-grow">확인</Button>
            </HStack>
          </VStack>
        )}
      </Modal>
      <StatusBar />
      <NavigationBar title={"Title"} onBack={() => {}} onHome={() => {}} />
      <Toggle
        selected={showModal}
        onClick={toggleShowModal}
        label="모달 띄우기"
      />
      <Toggle
        selected={darkModal}
        onClick={toggleDarkModal}
        label="어두운 모달"
      />
      <Toggle
        selected={modalType == "sheet"}
        onClick={toggleModalType}
        label="시트 모달"
      />
      <Toggle
        selected={keyPadModal}
        onClick={toggleKeyPadModal}
        label="계산기 모달"
      />
      {/* <VStack className="w-full p-1">
        {mockTripData.map((trip) => (
          <TripView key={trip.id} {...trip} />
        ))} */}
      {/* <TripView />
        <TripView />
        <TripView /> */}
      {/* </VStack> */}
    </VStack>
  );
}

export default IPhoneDemo;
