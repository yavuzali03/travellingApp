import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../screens/home";
import { Profile } from "../screens/profile";
import { Register } from "../screens/register";
import { Login } from "../screens/login";
import { Chats } from "../screens/chats";
import { MyTrips } from "../screens/myTrips";
import { CreateTrips } from "../screens/createTrips";
import { StyleSheet, TouchableOpacity, View,Text } from "react-native";
import {NavigationTabBar} from "./navigationTabBar";
import {Onboarding} from "../components/onboarding/onboarding";
import {Friends} from "../screens/friends";
import {Notifications} from "../screens/notifications";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export function HomeTabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => <NavigationTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Chats" component={Chats} />
            <Tab.Screen name="CreateTrips" component={CreateTrips}/>
            <Tab.Screen name="MyTrips" component={MyTrips} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export function RootStack({ isLoggedIn }) {
    return (
        <Stack.Navigator>
            {isLoggedIn ? (
                <>
                    <Stack.Screen name="homeScreen" component={HomeTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="friendsScreen" component={Friends} options={{ headerShown: false }} />
                    <Stack.Screen name="notifications" component={Notifications} options={{ headerShown: false }} />

                </>
            ) : (
                <>
                    <Stack.Screen name="loginScreen" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="registerScreen" component={Register} options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 5
    },
});
