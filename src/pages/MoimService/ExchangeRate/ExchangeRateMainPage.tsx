import { VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";

export default function ExchangeRateMainPage() {
  return (
    <VStack className="bg-gray-50">
      <NavigationBar title="나의 환율알림 $" />
      <VStack>
        <VStack></VStack>
      </VStack>
    </VStack>
  );
}
