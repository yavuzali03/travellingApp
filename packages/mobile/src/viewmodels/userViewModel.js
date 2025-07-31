import AsyncStorage from "@react-native-async-storage/async-storage";
import {getCurrentUser, getUser} from "../services/userServices";


const useUserViewModel = () => {

    const getUserData = async ({ userId }) => {
      try {

          const userData = await getUser(userId);
          return userData;

      }catch(err) {

      }
    };



    return {getUserData};
};
    export default useUserViewModel;
