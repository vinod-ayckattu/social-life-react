import axios from "axios";
import { GlobalContext } from "./GlobalContext";

export default function GlobalProvider({ children }) {

    const token = localStorage.getItem('sl-api-token');
    const followInfluencer = (creatorId) => {
    
    axios.post("http://127.0.0.1:8000/api/follow", {'creator_id': creatorId}, 
            { headers: { Authorization: `Bearer ${token}` }
            }).finally((res)=> {
                console.log(res.data.message);
            });
    }
    return (
        <GlobalContext.Provider value={{ followInfluencer }}>
        {children}
        </GlobalContext.Provider>
    );
    
}
