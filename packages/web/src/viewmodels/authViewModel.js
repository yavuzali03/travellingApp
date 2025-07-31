import { useState } from "react";
import { loginUser, registerUser } from "../services/authServices";
import { useUser } from "../contexts/userContext";

const useAuthViewModel = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const { setIsLoggedIn } = useUser();

    const handleRegister = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerUser(userData);
            console.log("Register API Yanıtı:", response);

            if (response && response.userToken && response.newUser) {
                localStorage.setItem("authToken", response.userToken);
                setUser(response.newUser);
                return response.newUser;
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
            console.log("çalışıyom")
            const response = await loginUser(credentials);

            if (response && response.token && response.user) {
                localStorage.setItem("authToken", response.token);
                localStorage.setItem("userData", JSON.stringify(response.user));
                localStorage.setItem("isLoggedIn", JSON.stringify(true));

                setUser(response.user);

                return response.user;
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
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            localStorage.removeItem('isLoggedIn');
            setUser(null);
            setIsLoggedIn(false);
        } catch (err) {
            setError(err.message);
        }
    }

    return { user, loading, error, handleRegister, handleLogin, handleLogout };
};

export default useAuthViewModel;
