import { createTripService, getAllTrip, getTrip, uploadTripCoverService } from '../services/tripServices';
import { getMyData } from "../utils/getMyData";
import { useUser } from "../contexts/userContext";

const fixImageUrl = (url) => {
    if (!url) return null;
    return url.replace('http://10.0.2.2:5002', 'http://localhost:5002');
};

const useTripViewModel = () => {
    const { setUser, setIsLoggedIn } = useUser();

    const createTrip = async ({ title, description, participants, creator, startDate, endDate, selectedFile }) => {
        try {
            const token = localStorage.getItem("authToken");
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

            const newTrip = await createTripService(tripData, token);

            console.log("🧪 selectedFile:", selectedFile);
            console.log("🧪 newTrip._id:", newTrip?._id);

            if (selectedFile && newTrip?._id) {
                const result = await uploadTripCoverService(newTrip._id, selectedFile);
                console.log("✅ Kapak görseli yüklendi:", result.imageUrl);
                newTrip.profileImage = fixImageUrl(result.imageUrl);
            }

            await getMyData({ setUser, setIsLoggedIn });

            return newTrip;
        } catch (error) {
            console.error("Trip ViewModel Error:", error.message);
            throw error;
        }
    };

    const getUserTrips = async (userId) => {
        try {
            const response = await getAllTrip(userId);
            return response.map(trip => ({
                ...trip,
                profileImage: fixImageUrl(trip.profileImage)
            }));
        } catch (err) {
            console.log(err.message);
        }
    }

    const getUserTrip = async (tripId) => {
        try {
            const response = await getTrip(tripId);
            return {
                ...response,
                profileImage: fixImageUrl(response.profileImage)
            };
        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        createTrip,
        getUserTrips,
        getUserTrip
    };
};

export default useTripViewModel;
