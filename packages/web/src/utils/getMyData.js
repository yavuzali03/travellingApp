import { getCurrentUser } from "../services/userServices";

export const getMyData = async ({ setUser, setIsLoggedIn , setLoading = () => {} }) => {
    try {
        const token = localStorage.getItem("authToken");
        const isLogged = localStorage.getItem("isLoggedIn");

        if (!token || isLogged !== "true") {
            setIsLoggedIn(false);
            return;
        }

        const userData = await getCurrentUser(token);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
    } catch (err) {
        console.error("getMyData error:", err.message);
        localStorage.removeItem("authToken");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    }finally {
        if (setLoading) setLoading(false);
    }
};
