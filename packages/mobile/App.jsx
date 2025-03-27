import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs, RootStack } from "./src/navigations/navigation";
import { UserProvider, useUser } from "./src/contexts/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {Onboarding} from "./src/components/onboarding/onboarding";

const App = () => {
    const [loading, setLoading] = useState(true);
    const { isLoggedIn, setIsLoggedIn, setUser } = useUser();

    useEffect(() => {
        async function getData() {
            try {
                const userData = await AsyncStorage.getItem("userData");
                const isLogged = await AsyncStorage.getItem("isLoggedIn");
                console.log("app.jsx: ", isLogged);
                if (isLogged === null) {
                    setIsLoggedIn(isLogged === 'false')
                    console.log(isLoggedIn);
                }else {
                    setIsLoggedIn(isLogged === 'true'); // Boolean olarak ayarlıyoruz
                }
                if (userData) {
                    setUser(JSON.parse(userData));
                }
                console.log(isLogged);
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [setIsLoggedIn, setUser]);

    if (loading) {
        // Loading spinner veya başka bir şey gösterebilirsiniz
        return null;
    }

    return (

        <NavigationContainer>
            {isLoggedIn ? <HomeTabs /> : <RootStack/>}
        </NavigationContainer>
    );
};

export default () => (
    <UserProvider>
        <App />
    </UserProvider>
);
