import React from "react";
import { Navigate } from "react-router";
import { Auth } from "./UserMiddleware";

export const CheckUser = ({ children }) => {
    const checkAuth = Auth();

    if (checkAuth.user == false) {
        return <Navigate to="/login" />;
    }
    
    return children;
}