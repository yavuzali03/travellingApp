import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUser } from "../services/userServices";

export const getMyData = async ({ setUser, setIsLoggedIn , setLoading = () => {} }) => {
    try {
        const token = await AsyncStorage.getItem("authToken");
        const isLogged = await AsyncStorage.getItem("isLoggedIn");

        if (!token || isLogged !== "true") {
            setIsLoggedIn(false);
            return;
        }

        const userData = await getCurrentUser(token);
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
    } catch (err) {
        console.error("getMyData error:", err.message);
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }finally {
        if (setLoading) setLoading(false);
    }
};
