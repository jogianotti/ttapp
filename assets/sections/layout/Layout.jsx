import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import Paper from '@mui/material/Paper';
import {NavBar} from './NavBar';

export function Layout() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);
    const [value, setValue] = useState('/' + (window.location.hash.split('/')[1] ?? ''));

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            {authenticated && roles.includes('ROLE_ADMIN') &&
                <div>
                    <NavBar/>
                    <Outlet/>
                    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0,}} elevation={3}>
                        <BottomNavigation
                            showLabels={false}
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                navigate(newValue);
                            }}
                        >
                            <BottomNavigationAction label="Admin" icon={<HomeIcon/>} value={'/'}/>
                            <BottomNavigationAction label="Clientes" icon={<PeopleIcon/>} value={'/clients'}/>
                            <BottomNavigationAction label="Opciones" icon={<SettingsIcon/>} value={'/settings'}/>
                        </BottomNavigation>
                    </Paper>
                </div>
            }
        </>
    );
}
