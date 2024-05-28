import { useState } from "react";
import Arrow from "../components/common/Arrow";
import Button from "../components/common/Button";
import Modal from "../components/common/Modals/Modal";
import Select from "../components/common/Select";
import Select2 from "../components/common/Select2";
import { VStack, HStack, Spacer } from "../components/common/Stack";
import TextArea from "../components/common/TextArea";
import Title from "../components/common/Title";
import Toggle from "../components/common/Toggle";
import NavigationBar from "../components/common/TopBars/NavigationBar";
import { useNavigation } from "../contexts/useNavigation";
import Option from "../components/common/Option";

function DemoPage() {
  const [selectedOption, setSelectedOption] = useState(1);
  const [bool, setBool] = useState(false);
  const toggle = () => {
    setBool((bool) => !bool);
  };
  const { back, home, navigateTo } = useNavigation();

  return (
    <>
      <VStack className="!gap-0">
        <NavigationBar title={"데모 페이지"} onBack={back} onHome={home} />
        <VStack className="p-2">
          <Title> Button </Title>
          <Button disabled>확인</Button>
          <Button>확인</Button>
          <Button disabled fullyRounded>
            확인
          </Button>
          <Button fullyRounded>확인</Button>
          <Button fullyRounded disabled={!bool} className="!px-16 ">
            저장
          </Button>
          <VStack>
            <Title>Option</Title>
            <HStack>
              <Option
                selected={selectedOption == 1}
                onClick={() => setSelectedOption(1)}
              >
                요청
              </Option>
              <Option
                selected={selectedOption == 2}
                onClick={() => setSelectedOption(2)}
              >
                공지
              </Option>
              <Option
                selected={selectedOption == 3}
                onClick={() => setSelectedOption(3)}
              >
                정산
              </Option>
              <Option
                selected={selectedOption == 4}
                onClick={() => setSelectedOption(4)}
              >
                알림
              </Option>
            </HStack>
            <Spacer />
            <VStack>
              <Title>Select</Title>
              <Select
                options={["회비 낸 사람", "안 낸 사람"]}
                onSelect={console.log}
              />
              <Select
                options={["1", "2", "3", "4", "5"]}
                onSelect={console.log}
              />
              <Title>Select2</Title>
              <div className="border border-black p-2">
                <Select2 options={["입금", "지출"]} onSelect={console.log} />
              </div>
            </VStack>
          </VStack>
          <VStack>
            <Title>Arrow</Title>
            <HStack>
              <Arrow direction={"up"} />
              <Arrow direction={"down"} />
              <Arrow direction={"left"} />
              <Arrow direction={"right"} />
            </HStack>
            <Spacer />
            <VStack>
              <Title>Toggle</Title>
              <Toggle
                selected={bool}
                onClick={toggle}
                label="이거 눌러서 모달 띄워서 페이지 이동"
              />
              <Toggle selected={bool} onClick={toggle} label="" />
            </VStack>
          </VStack>

          <TextArea
            label={"제목"}
            rows={4}
            placeholder="pcadsfs"
            border
            largeRounded
          />
        </VStack>
      </VStack>
      <Modal show={bool} onClose={toggle} backDrop>
        <VStack>
          <span className="text-bold text-gray-500 text-center">
            참여중인 모임이 없어요.
          </span>
          <span className="text-bold text-gray-500 pb-4">
            모임통장 서비스를 이용하시겠어요?
          </span>
          <HStack>
            <Button gray onClick={toggle}>
              취소
            </Button>
            <Button
              className="flex-grow"
              onClick={() => {
                toggle();
                navigateTo({ page: <DemoPage /> });
              }}
            >
              확인
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </>
  );
}
export default DemoPage;
