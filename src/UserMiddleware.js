import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const UserMiddleware = ({ children }) => {
    const [user, setUser] = useState(sessionStorage.getItem("token"));

    const login = (user) => {
        setUser(user);
    };
    
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const Auth = () => {
    return useContext(AuthContext)
}