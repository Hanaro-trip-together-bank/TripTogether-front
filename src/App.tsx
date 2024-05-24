import IPhoneFrame from "./components/common/IPhoneFrame";
import NavigationStack from "./components/common/Navigation/NavigationStack";
import { NavigationProvider } from "./contexts/useNavigation";

function App() {
  return (
    <NavigationProvider>
      <IPhoneFrame>
        <NavigationStack />
      </IPhoneFrame>
    </NavigationProvider>
  );
}

export default App;
