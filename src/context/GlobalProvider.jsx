import axios from "axios";
import { GlobalContext } from "./GlobalContext";


export default function GlobalProvider({ children }) {

    const token = localStorage.getItem('sl-api-token');
    

    const followInfluencer = async (creatorId) => {
    
        const res = await axios.post(
            "http://127.0.0.1:8000/api/follow",
            { creator_id: creatorId },
            { headers: { Authorization: `Bearer ${token}` } }
        );


        return res.data.message; // return actual result
    }

    const unFollowInfluencer = async (creatorId) => {
    
        const res = await axios.post(
            "http://127.0.0.1:8000/api/unfollow",
            { creator_id: creatorId },
            { headers: { Authorization: `Bearer ${token}` } }
        );


        return res.data.message; // return actual result
    }
    return (
        <GlobalContext.Provider value={{ followInfluencer, unFollowInfluencer }}>
        {children}
        </GlobalContext.Provider>
    );
    
}
