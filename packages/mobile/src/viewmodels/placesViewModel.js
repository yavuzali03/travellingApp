import {fetchNearbyPlaces} from "../services/placesServices";


const usePlacesViewModel = () => {

    const getNearbyPlaces = async (lat,lng) => {
        try {
            const response = await fetchNearbyPlaces(lat,lng)
            return response;
        }catch(err){
            console.log(err.message);
        }
    }

    return {
        getNearbyPlaces,
    }
}

export default usePlacesViewModel;
