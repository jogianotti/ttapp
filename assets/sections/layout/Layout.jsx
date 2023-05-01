import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Logout} from "../login/Logout";

export function Layout() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {authenticated && roles.includes('ROLE_ADMIN') &&
                <div>
                    <header>
                        <section>
                            <div>
                                <Link to="/">
                                    <h1>Dashboard</h1>
                                </Link>

                                <Link to="/contacts">
                                    <h1>contacts</h1>
                                </Link>
                                <Logout/>
                                <Link to="/config">
                                    <span>⚙️</span>
                                </Link>
                            </div>
                        </section>
                    </header>
                    <Outlet/>
                </div>
            }
        </>
    );
}
