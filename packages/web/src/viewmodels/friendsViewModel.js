import {
    acceptFriendRequest, cancelFriendRequest,
    declineFriendRequest,
    getFriendRequests,
    getFriends,
    sentFriendRequest
} from "../services/friendsServices";
import {useUser} from "../contexts/userContext";
import {getMyData} from "../utils/getMyData";


const useFriendsViewModel = ()=>{
    const { setUser, setIsLoggedIn } = useUser();

    const getFriendsData = async (userId) => {
        try {

            const friends = await getFriends(userId);
            return friends;

        }catch(err) {
            console.log(err.message);
        }

    }

    const getFriendRequestsData = async (userId) => {
        try {
            const response = await getFriendRequests(userId);

            await getMyData({ setUser, setIsLoggedIn });

            return response;
        }catch(err) {
            console.log(err.message);
        }

    }

    const sendRequest = async (userId, friendId) => {
        try {
            const response = await  sentFriendRequest(userId, friendId);

            await getMyData({ setUser, setIsLoggedIn });

            return response;
        }catch (err){
            console.log(err.message);
        }
    }

    const acceptRequest = async (userId, friendId) => {
        try {
            const response = await acceptFriendRequest(userId, friendId);

            await getMyData({ setUser, setIsLoggedIn });

            return response;
        }catch(err) {
            console.log(err.message);
        }
    }
    const declineRequest = async (userId, friendId) => {
        try {
            const response = await declineFriendRequest(userId, friendId);

            await getMyData({ setUser, setIsLoggedIn });

            return response;
        }catch(err) {
            console.log(err.message);
        }
    }

    const cancelRequest = async (userId, friendId) => {

       try {
           const response = await cancelFriendRequest(userId, friendId);

           await getMyData({ setUser, setIsLoggedIn });

           return response;

       }catch (err){
           console.log(err.message);
       }
    }

    return {getFriendsData,getFriendRequestsData ,acceptRequest,declineRequest ,sendRequest ,cancelRequest};
}



export default useFriendsViewModel;
