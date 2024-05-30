import Alarm from "./components/common/Alarm";
import IPhoneFrame from "./components/common/IPhoneFrame";
import NavigationStack from "./components/common/Navigation/NavigationStack";
import Toggle from "./components/common/Toggle";
import { useAuth } from "./contexts/useAuth";
import useToggle from "./hooks/useToggle";

function App() {
  const [showAlarm, toggleAlarm] = useToggle();
  const { member, setIdx } = useAuth();
  return (
    <>
      <Toggle selected={showAlarm} onClick={toggleAlarm} />
      <input
        className="w-12"
        type={"number"}
        value={member.memberIdx}
        onChange={(e) => setIdx(+e.target.value)}
      />
      <IPhoneFrame>
        <Alarm show={showAlarm} />
        <NavigationStack />
      </IPhoneFrame>
    </>
  );
}

export default App;
