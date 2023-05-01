import React from "react";
import {useNavigate} from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault()

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

    return (
        <>
            <button className="btn btn-primary" onClick={handleLogout}>Salir</button>
        </>
    )
}