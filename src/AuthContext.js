import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("https://andreea.ligaac.ro/api/account/GetOneUser", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser({ token, ...response.data }); // Assuming response.data contains the user details
                } catch (error) {
                    console.log("Failed to fetch user details:", error);
                    // Handle errors or clear token if necessary
                }
            }
        };

        fetchUserDetails();
    }, []);

    const login = async (token) => {
        localStorage.setItem("token", token);
        try {
            const response = await axios.get("https://andreea.ligaac.ro/api/account/GetOneUser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser({ token, ...response.data }); // Set user details along with token
        } catch (error) {
            console.log("Failed to fetch user details:", error);
            // Optionally handle login failure or remove token
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
