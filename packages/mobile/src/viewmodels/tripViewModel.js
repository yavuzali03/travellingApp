import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTrip as createTripService } from '../services/tripServices';

const useTripViewModel = () => {

    const createTrip = async ({ title, description, participants, creator }) => {
        try {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) throw new Error("Kullanıcı oturumu bulunamadı");

            const tripData = {
                creator,
                title,
                description,
                participants: participants.map(p => p.value), // Çoklu seçimden sadece id'leri al
            };

            const result = await createTripService(tripData, token);
            return result;
        } catch (error) {
            console.error("Trip ViewModel Error:", error.message);
            throw error;
        }
    };

    return {
        createTrip,
    };
};

export default useTripViewModel;
