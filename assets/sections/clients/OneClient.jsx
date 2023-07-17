import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";

export function OneClient() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState([])
    const [works, setWorks] = useState([])
    const [authenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles] = useState(localStorage.getItem("roles") || []);

    const fetchClientData = () => {
        fetch(`/admin/clients/${id}`)
            .then(response => response.json())
            .then(data => {
                setClient(data)
            })
    }
    const fetchWorksData = () => {
        fetch(`/admin/works/${id}`)
            .then(response => response.json())
            .then(data => {
                setWorks(data)
            })
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchClientData();
        fetchWorksData();
    }, []);

    function handleListItemClick(work) {
        navigate("/clients/" + client.id + "/works/" + work.id);
    }

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h4'}>
                        Cliente: {client.name}
                        <Button variant="contained" href={`/#/clients/${id}/works/new`} sx={{}}>
                            Nueva Obra
                        </Button>
                    </Typography>
                    <Grid item>
                        {works.length > 0 && (
                            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                                {works.map(work => (
                                    <ListItem alignItems="flex-start" key={work.id} id={work.id}
                                              onClick={() => handleListItemClick(work)}>
                                        <ListItemText
                                            primary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="h4"
                                                        variant="body0"
                                                        color="text.primary"
                                                    >
                                                        {work.title}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {work.description}
                                                    </Typography><br/>
                                                    <Typography
                                                        sx={{display: 'inline'}}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.secundary"
                                                    >
                                                        {work.boiler.brand} {work.boiler.model}
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
