import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCurrentUser, getUser} from "../services/userServices";


const useUserViewModel = () => {

     const getMyData = async ({ setUser, setIsLoggedIn, setLoading }) => {
         try {
             const token = await AsyncStorage.getItem("authToken");
             const isLogged = await AsyncStorage.getItem("isLoggedIn");

             console.log("Stored isLoggedIn:", isLogged);
             console.log("Stored token:", token);

             if (!token || isLogged !== "true") {
                 setIsLoggedIn(false);
                 return;
             }

             const userData = await getCurrentUser(token);

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


    const getUserData = async ({ userId }) => {
      try {

          const userData = await getUser(userId);
          return userData;

      }catch(err) {

      }
    };



    return {getMyData ,getUserData};
};
    export default useUserViewModel;
