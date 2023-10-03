import React, {useEffect, useState} from 'react';
import {Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

export function WorkRequests() {

    const navigate = useNavigate();
    const [requests, setRequests] = useState([])
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);


    const fetchRequestsData = () => {
        // @TODO implementar con limit y offset
        fetch("/admin/work_requests")
            .then(response => response.json())
            .then(data => {
                setRequests(data)
            })
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchRequestsData();
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h6'}>
                        Pedidos de Obra
                    </Typography>
                    <Grid item>
                        {requests.length > 0 && (
                            <List sx={{width: '100%'}}>
                                {requests.map(request => (
                                    <ListItem
                                        alignItems="flex-start"
                                        key={request.id} id={request.id}
                                    >
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline', fontWeight: 'bold'}}
                                                        component="p"
                                                        variant="body1"
                                                        color="text.primary"
                                                    >
                                                        {request.client.name}
                                                    </Typography><br/>
                                                    <Typography
                                                        sx={{display: 'inline', fontWeight: 'bold'}}
                                                        component="p"
                                                        variant="body1"
                                                        color="text.primary"
                                                    >
                                                        {request.client.email}
                                                    </Typography>
                                                    {request.cliente.phoneNumbre && (
                                                        <Typography
                                                            sx={{display: 'inline', fontWeight: 'bold'}}
                                                            component="p"
                                                            variant="body1"
                                                            color="text.primary"
                                                        >
                                                            {request.client.phoneNumber}
                                                        </Typography>
                                                    )}
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="p"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Tipo de trabajo: {request.workType}
                                                    </Typography><br/>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="p"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Sistema de calefacción: {request.heatingSystem}
                                                    </Typography><br/>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="p"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Instalación existente: {request.existingInstallation}
                                                    </Typography><br/>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="p"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        Dirección: {request.address}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}
