import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUser} from "../services/userServices";


const useUserViewModel = () => {

     const getUserData = async ({ setUser, setIsLoggedIn, setLoading }) => {
         try {
             const token = await AsyncStorage.getItem("authToken");
             const isLogged = await AsyncStorage.getItem("isLoggedIn");

             console.log("Stored isLoggedIn:", isLogged);
             console.log("Stored token:", token);

             if (!token || isLogged !== "true") {
                 setIsLoggedIn(false);
                 return;
             }
             console.log("abi buradayım");
             const userData = await getUser(token);
             console.log("abi buradayım 2");
             await AsyncStorage.setItem("userData", JSON.stringify(userData));
             setUser(userData);
             setIsLoggedIn(true);
         } catch (err) {
             console.error("Kullanıcı bilgisi alınamadı:", err.message);
             await AsyncStorage.removeItem("authToken");
             await AsyncStorage.removeItem("isLoggedIn");
             setIsLoggedIn(false);
         } finally {
             setLoading(false);
         }
    };



    return { getUserData};
};
    export default useUserViewModel;
