import React from "react";
import {useNavigate} from "react-router-dom";

export function RouterMiddleware({children}) {
    const navigate = useNavigate();

    fetch('/admin/check', {
        method: 'GET'
    })
        .then(async (response) => {
            if (response.status === 401) {
                throw new Error(response.status)
            }
        })
        .catch(error => {
            localStorage.removeItem("authenticated");
            localStorage.removeItem("username");
            localStorage.removeItem("roles");
        });

    return <>{children}</>;
}