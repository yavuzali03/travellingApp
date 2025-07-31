import {fetchNearbyPlaces} from "../services/placesServices";


const usePlacesViewModel = () => {

    const getNearbyPlaces = async (lat,lng) => {
        try {
            if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
                throw new Error('Geçersiz konum bilgisi');
            }

            const response = await fetchNearbyPlaces(lat,lng)
            if (!response) {
                throw new Error('Yanıt alınamadı');
            }
            return response;
        }catch(err){
            console.error('Yakın yerler alınırken hata:', err.message);
            throw err;
        }
    }

    return {
        getNearbyPlaces,
    }
}

export default usePlacesViewModel;
