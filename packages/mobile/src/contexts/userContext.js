import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const userData = await AsyncStorage.getItem("userData");
                const isLogged = await AsyncStorage.getItem("isLoggedIn");
                setIsLoggedIn(isLogged === 'true');  // 'true' olarak kaydedilmişse, boolean olarak doğru
                if (userData) {
                    setUser(JSON.parse(userData));
                }
            } catch (error) {
                console.error("Error loading user data:", error);
            }
        }
        getData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
