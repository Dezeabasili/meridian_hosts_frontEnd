import { useState, createContext, useContext } from "react";

const AuthContext = createContext()

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [trustThisDevice, setTrustThisDevice] = useState(JSON.parse(localStorage.getItem('trustThisDevice')) || false)
    // console.log(auth)

    return <AuthContext.Provider value={{ auth, setAuth, trustThisDevice, setTrustThisDevice }}>
        {children}
    </AuthContext.Provider>
}

