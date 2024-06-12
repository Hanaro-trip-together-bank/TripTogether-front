import Alarm from "./components/common/Alarm";
import IPhoneFrame from "./components/common/IPhoneFrame";
import NavigationStack from "./components/common/Navigation/NavigationStack";
import Toggle from "./components/common/Toggle";
import { useAuth } from "./contexts/useAuth";
import useToggle from "./hooks/useToggle";
import "./firebaseConfig.ts";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { requestPermission } from "./firebaseConfig.ts";

function App() {
  const [showAlarm, toggleAlarm] = useToggle();
  const [alarmTitle, setTitle] = useState<string>("");
  const [alarmBody, setBody] = useState<string>("");
  const { member, setIdx } = useAuth();

  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        toggleAlarm();
        console.log(payload);
        setTitle(payload.notification.title);
        setBody(payload.notification.body);
        setTimeout(() => {
          if (showAlarm) toggleAlarm();
        }, 5000);
      });
      requestPermission();
    }
  }, []);

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
        <Alarm
          show={showAlarm}
          title={alarmTitle}
          body={alarmBody}
          onClickAlarm={toggleAlarm}
        />
        <NavigationStack />
      </IPhoneFrame>
    </>
  );
}

export default App;
