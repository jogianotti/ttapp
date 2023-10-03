import React, {useEffect, useState} from 'react';
import {Button, Grid} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useNavigate} from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }
    }, []);

    const handleClientsClick = () => navigate('/clients');
    const handleServicesClick = () => navigate('/service_requests');
    const handleWorksClick = () => navigate('/work_requests');

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Button variant={'contained'} fullWidth
                            onClick={handleClientsClick}
                            sx={{
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Clientes
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                    <Button variant={'contained'} fullWidth
                            onClick={handleServicesClick}
                            sx={{
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Solicitudes de servicio técnico
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                    <Button variant={'contained'} fullWidth
                            onClick={handleWorksClick}
                            sx={{
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Pedidos de obra
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}