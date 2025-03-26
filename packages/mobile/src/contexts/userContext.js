import {createContext, useContext, useState} from "react";

const userContext = createContext();

export const UserProvider = ({children})=>{
    const [user, setUser] = useState([]);

    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = ()=> useContext(userContext);
