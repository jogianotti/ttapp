import React, {useEffect, useState} from 'react';
import {Button, Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function Clients() {

    const navigate = useNavigate();
    const [clients, setClients] = useState([])
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    const fetchClientsData = () => {
        fetch("/admin/clients")
            .then(response => response.json())
            .then(data => {
                setClients(data)
            })
    }

    function handleListItemClick(client) {
        navigate("/clients/" + client.id)
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchClientsData();
    }, []);

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h4'}>
                        Clientes <Button variant="contained" href={'/#/clients/new'}>Nuevo</Button>
                    </Typography>
                    <Grid item>
                        {clients.length > 0 && (
                            <List sx={{width: '100%'}}>
                                {clients.map(client => (
                                    // <>
                                    <ListItem
                                        alignItems="flex-start"
                                        key={client.id} id={client.id}
                                        onClick={() => handleListItemClick(client)}
                                        secondaryAction={
                                            <IconButton edge="end">
                                                <ArrowForwardIosIcon/>
                                            </IconButton>
                                        }
                                    >
                                        <ListItemText
                                            primary={client.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {client.email}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    // <Divider variant="inset" component="li"/>
                                    // </>
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