import { createContext, useContext, useState } from "react";

const defaultProviderValues = {};

const AppContext = createContext(defaultProviderValues);

export const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState("");
    const [userToken, setUserToken] = useState("");
    const [exerciseData, setExerciseData] = useState([]);

    return (
        <AppContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                exerciseData,
                setExerciseData,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
