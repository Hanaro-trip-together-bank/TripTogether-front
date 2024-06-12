import Button from "../../../components/common/Button";
import { VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";

export default function ExchangeRateDonePage() {
  const { back } = useNavigation();

  const onClckComplete = () => {
    back();
  };

  return (
    <VStack className=" bg-gray-50 gap-4 w-full h-full items-center">
      <NavigationBar title="환율 알림신청 🔔" />

      <VStack className="mt-32 gap-4 px-6">
        <p className="text-9xl mx-auto">💵</p>
        <p className="text-primary text-2xl mb-10">
          🔆 환율 알림 신청이 완료되었어요!
        </p>
      </VStack>
      <Button className="w-60" roundedFull onClick={onClckComplete}>
        확인
      </Button>
    </VStack>
  );
}
