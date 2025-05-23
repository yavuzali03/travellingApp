import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {socket} from "../services/socket";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const userData = await AsyncStorage.getItem("userData");
                const isLogged = await AsyncStorage.getItem("isLoggedIn");
                setIsLoggedIn(isLogged === 'true');
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        if (user?._id) {
            socket.emit('online', { userId: user._id });
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
