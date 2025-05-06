import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs, RootStack } from "./src/navigations/navigation";
import { UserProvider, useUser } from "./src/contexts/userContext";
import { useEffect, useState } from "react";
import {ActivityIndicator, View} from "react-native";
import {StyleProvider} from "./src/contexts/styleContext";
import useUserViewModel from "./src/viewmodels/userViewModel";
import {navigationRef} from "./src/navigations/navigationRef";

const App = () => {
    const [loading, setLoading] = useState(true);
    const { setUser, isLoggedIn, setIsLoggedIn } = useUser();
    const {getUserData} = useUserViewModel();

    useEffect(() => {
        getUserData({ setUser, setIsLoggedIn, setLoading });
    }, []);

    if (loading) {
        // Örneğin bir spinner gösterelim
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <RootStack isLoggedIn={isLoggedIn} />
        </NavigationContainer>

    );
};

export default () => (
    <UserProvider>
        <StyleProvider>
        <App />
        </StyleProvider>
    </UserProvider>
);
