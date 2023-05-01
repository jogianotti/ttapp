import React, {useEffect, useState} from "react";

import {Outlet, useNavigate} from "react-router-dom";
import {Logout} from "../login/Logout";

export function ClientLayout() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_CLIENT')) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {authenticated && <div>
                <h1>Cliente</h1>
                <Logout/>
                <Outlet/>
            </div>}
        </>
    )
}