import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loginUser, registerUser} from "../services/authServices";
import {useNavigation} from "@react-navigation/native";
import {RootStack} from "../navigations/navigation";
import {useUser} from "../contexts/userContext";


const useAuthViewModel = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const navigation = useNavigation();
    const {setIsLoggedIn } = useUser();

    const handleRegister = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerUser(userData);
            console.log("Register API Yanıtı:", response);

            if (response && response.userToken && response.newUser) {
                await AsyncStorage.setItem("authToken", response.userToken); // Token'ı kaydet
                setUser(response.newUser); // Kullanıcı bilgisini kaydet
                return response.newUser; // Home'e yönlendirmek için dönüş yap
            } else {
                setError("Kayıt başarısız. Geçerli bir yanıt alınamadı.");
            }
        } catch (err) {
            setError(err.message || "Kayıt işlemi başarısız");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(credentials);

            if (response && response.token  && response.user) {

                await AsyncStorage.setItem("authToken", JSON.stringify(response.token));
                await AsyncStorage.setItem("userData", JSON.stringify(response.user));
                await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));

                setUser(response);

                return response;

            } else {
                setError("Giriş başarısız. Geçerli bir yanıt alınamadı.");
            }
        } catch (err) {
            setError(err.message || "Giriş işlemi başarısız");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        setError(null);
        try {
            await AsyncStorage.removeItem('authToken');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.removeItem('isLoggedIn');
            setUser(null);
            setIsLoggedIn(false);

            navigation.reset({
                index: 0,
                routes: [{ name: 'loginScreen' }]  // 'loginScreen' rotasına yönlendir
            });

        }catch (err) {
            setError(err.message);
        }
    }

    return { user, loading, error, handleRegister, handleLogin , handleLogout};
};

export default useAuthViewModel;
