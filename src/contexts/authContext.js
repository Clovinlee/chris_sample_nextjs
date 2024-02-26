'use client'
import {useState, createContext, useEffect, useLayoutEffect } from "react";
// import { cookies } from 'next/headers'

export const AuthContext = createContext();

function AuthContextProvider ({children}) {
    const [userAuth, setUserAuth] = useState();
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {

    }, []);

    return (
        <AuthContext.Provider value={{ userAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;