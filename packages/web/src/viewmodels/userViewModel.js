import { getCurrentUser, getUser } from "../services/userServices";

const useUserViewModel = () => {
    const getUserData = async (userId) => {
        try {
            const userData = await getUser(userId);
            return userData;
        } catch (err) {
            console.error("Kullanıcı bilgileri alınamadı:", err.message);
        }
    };

    return { getUserData };
};

export default useUserViewModel;
