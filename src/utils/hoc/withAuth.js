"use client"

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function withAuth(Component){
    return function WithAuth(props){
        const user = false;
        console.log(user)
        useEffect(() => {
            if(!user){
                redirect("/login");
            }
        }, []);

        if (!user) {
            return(
                <div>Redirecting...</div>
            )
        };
        return <Component {...props} />;
    };
}