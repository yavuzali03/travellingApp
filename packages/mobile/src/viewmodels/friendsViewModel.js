import {acceptFriendRequest, declineFriendRequest, getFriendRequests, getFriends} from "../services/friendsServices";


const useFriendsViewModel = ()=>{

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
            return response;
        }catch(err) {
            console.log(err.message);
        }

    }

    const acceptRequest = async (userId, friendId) => {
        try {
            const response = await acceptFriendRequest(userId, friendId);
            return response;
        }catch(err) {
            console.log(err.message);
        }
    }
    const declineRequest = async (userId, friendId) => {
        try {
            const response = await declineFriendRequest(userId, friendId);
            return response;
        }catch(err) {
            console.log(err.message);
        }
    }

    return {getFriendsData,getFriendRequestsData ,acceptRequest,declineRequest};
}



export default useFriendsViewModel;
