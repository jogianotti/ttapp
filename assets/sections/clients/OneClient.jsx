import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Button, Grid} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";

export function OneClient() {
    const {id} = useParams();
    const [client, setClient] = useState([])
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    const fetchClientData = () => {
        fetch(`/admin/clients/${id}`)
            .then(response => response.json())
            .then(data => {
                setClient(data)
            })
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchClientData();
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h4'}>
                        Cliente: {client.name}
                        <Button variant="contained" href={'/#/clients'} sx={{}}>
                            <ArrowBackIcon></ArrowBackIcon>
                        </Button>
                    </Typography>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}
