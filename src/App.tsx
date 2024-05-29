import Alarm from "./components/common/Alarm";
import IPhoneFrame from "./components/common/IPhoneFrame";
import NavigationStack from "./components/common/Navigation/NavigationStack";
import Toggle from "./components/common/Toggle";
import { NavigationProvider } from "./contexts/useNavigation";
import useToggle from "./hooks/useToggle";

function App() {
  const [showAlarm, toggleAlarm] = useToggle();
  return (
    <>
      <Toggle selected={showAlarm} onClick={toggleAlarm} />
      <NavigationProvider>
        <IPhoneFrame>
          <Alarm show={showAlarm} />
          <NavigationStack />
        </IPhoneFrame>
      </NavigationProvider>
    </>
  );
}

export default App;
