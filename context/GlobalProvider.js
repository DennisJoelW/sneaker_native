import { createContext, useContext, useState, useEffect, Children } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ Children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return(
        <GlobalContext.Provider
            value={{

            }}
        >
            {Children}
        </GlobalContext.Provider>
    )
}