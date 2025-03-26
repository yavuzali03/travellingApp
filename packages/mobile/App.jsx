import {NavigationContainer} from "@react-navigation/native";
import {RootStack} from "./src/navigations/navigation";
import {UserProvider} from "./src/contexts/userContext";

const App = ()=>{
  return (
      <UserProvider>
      <NavigationContainer>
          <RootStack/>
      </NavigationContainer>
      </UserProvider>
  )
}
export default App;
