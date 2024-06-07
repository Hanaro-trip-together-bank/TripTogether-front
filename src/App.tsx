import Alarm from "./components/common/Alarm";
import IPhoneFrame from "./components/common/IPhoneFrame";
import NavigationStack from "./components/common/Navigation/NavigationStack";
import Toggle from "./components/common/Toggle";
import { useAuth } from "./contexts/useAuth";
import useToggle from "./hooks/useToggle";
import "./firebaseConfig.ts";
import firebase from "firebase/app";
import { useState } from "react";

function App() {
  const [showAlarm, toggleAlarm] = useToggle();
  const [alarmTitle, setTitle] = useState<string>("");
  const [alarmBody, setBody] = useState<string>("");
  const { member, setIdx } = useAuth();

  const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    toggleAlarm();
    setTitle(payload.notification.title);
    setBody(payload.notification.body);
  });

  return (
    <>
      <div className="absolute">
        <Toggle selected={showAlarm} onClick={toggleAlarm} />
        <input
          className="w-12"
          type={"number"}
          value={member.memberIdx}
          onChange={(e) => setIdx(+e.target.value)}
        />
      </div>
      <IPhoneFrame>
        <Alarm show={showAlarm} title={alarmTitle} body={alarmBody} />
        <NavigationStack />
      </IPhoneFrame>
    </>
  );
}

export default App;
