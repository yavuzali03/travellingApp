import AsyncStorage from '@react-native-async-storage/async-storage';
import {createTripService, getAllTrip, uploadTripCoverService} from '../services/tripServices';


const useTripViewModel = () => {
    const createTrip = async ({ title, description, participants, creator, startDate, endDate, selectedFile }) => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) throw new Error("Kullanıcı oturumu bulunamadı");

            const allParticipants = [...new Set([creator, ...participants])];
            console.log("📅 start:", startDate);
            console.log("📅 end:", endDate);
            const tripData = {
                creator,
                title,
                description,
                participants: allParticipants,
                startDate,
                endDate
            };

            // 🧱 1. Trip oluştur
            const newTrip = await createTripService(tripData, token);


            console.log("🧪 selectedFile:", selectedFile);
            console.log("🧪 newTrip._id:", newTrip?._id);

            // 🧱 2. Kapak görseli varsa yükle
            if (selectedFile && newTrip?._id) {
                const result = await uploadTripCoverService(newTrip._id, selectedFile);
                console.log("✅ Kapak görseli yüklendi:", result.imageUrl);
                newTrip.profileImage = result.imageUrl; // güncellenmiş trip objesi
            }

            return newTrip;
        } catch (error) {
            console.error("Trip ViewModel Error:", error.message);
            throw error;
        }
    };
    const getUserTrips = async (userId) => {
        try {

            const response = await getAllTrip(userId);
            return response;

        }catch(err) {
            console.log(err.message);
        }
    }
    return {
        createTrip,
        getUserTrips
    };
};

export default useTripViewModel;
