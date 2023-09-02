import React, {useEffect, useState} from "react";

import {Outlet, useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import {ClientNavBar} from "./ClientNavBar";

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
                <Grid container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                >
                    <ClientNavBar/>
                    <Outlet/>
                </Grid>
            </div>}
        </>
    )
}