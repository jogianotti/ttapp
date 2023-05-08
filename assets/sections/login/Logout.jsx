import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {

        fetch('/logout', {
            method: 'GET'
        })
            .then(async (data) => {
                localStorage.removeItem("authenticated");
                localStorage.removeItem("roles");
                localStorage.removeItem("username");

                navigate("/login");

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    useEffect(handleLogout, [])
}