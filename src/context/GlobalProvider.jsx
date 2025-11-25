import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { useState } from "react";

export default function GlobalProvider({ children }) {

    const token = localStorage.getItem('sl-api-token');
    const [message, setMessage] = useState('');

    const followInfluencer = (creatorId) => {
    setMessage('');
    axios.post("http://127.0.0.1:8000/api/follow", {'creator_id': creatorId}, 
            { headers: { Authorization: `Bearer ${token}` }
            }).then((res)=> {
                //console.log(res);
                setMessage(res.data.message);
            });
    return message;
    }
    return (
        <GlobalContext.Provider value={{ followInfluencer }}>
        {children}
        </GlobalContext.Provider>
    );
    
}
