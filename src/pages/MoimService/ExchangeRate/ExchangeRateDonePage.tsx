import Button from "../../../components/common/Button";
import NavigationLink from "../../../components/common/Navigation/NavigationLink";
import { Spacer, VStack } from "../../../components/common/Stack";
import NavigationBar from "../../../components/common/TopBars/NavigationBar";
import { useNavigation } from "../../../contexts/useNavigation";
import MainPage from "../../Main/MainPage";
import MoimDetailPage from "../MoimDetailPage";
import MoimServiceMainPage from "../MoimServiceMainPage";
import ExchangeRateMainPage from "./ExchangeRateMainPage";

export default function ExchangeRateDonePage() {
  const { back, setPath } = useNavigation();

  const onClckComplete = () => {
    back();
    back();
    // setPath([
    //   { backgroundColor: "bg-[#e3e7e9]", page: <MainPage /> },
    //   { backgroundColor: "bg-gray-50", page: <MoimServiceMainPage /> },
    //   { backgroundColor: "bg-gray-50", page: <MoimDetailPage /> },
    // ]);
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
      {/* <Button className="w-60" roundedFull onClick={onClckComplete}>
        확인
      </Button> */}
      <NavigationLink
        to={{ page: <ExchangeRateMainPage />, backgroundColor: "bg-gray-50" }}
      >
        확인
      </NavigationLink>
    </VStack>
  );
}
