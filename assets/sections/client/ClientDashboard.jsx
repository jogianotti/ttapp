import React, {useEffect, useState} from "react";
import {Button, Grid} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useNavigate} from "react-router-dom";

export function ClientDashboard() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_CLIENT')) {
            navigate("/login");
        }
    }, []);

    const handleServiceClick = () => navigate('/client/request_service');
    const handleWorkClick = () => navigate('/client/request_work');

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Button variant={'contained'} fullWidth
                            onClick={handleServiceClick}
                            sx={{
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Solicitar servicio técnico
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                    <Button variant={'contained'} fullWidth
                            onClick={handleWorkClick}
                            sx={{
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Pedido de obra
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                    <Button variant={'contained'} fullWidth
                            sx={{
                                backgroundColor: 'grey',
                                mb: 2,
                                borderRadius: '20px / 50%',
                                textTransform: 'none',
                                justifyContent: 'left',
                                pl: '20px'
                            }}>
                        Requisitos de obra
                        <ArrowForwardIosIcon sx={{position: 'absolute', right: 10}}/>
                    </Button>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}