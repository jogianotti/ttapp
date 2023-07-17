import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, Select, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import 'dayjs/locale/es';
import Box from "@mui/material/Box";
import {useNavigate, useParams} from "react-router-dom";

export function NewWork() {
    const {client} = useParams();
    const navigate = useNavigate();
    const [boilerid, setBoilerId] = useState('');
    const [boilers, setBoilers] = useState([]);
    const [authenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles] = useState(localStorage.getItem("roles") || []);

    const fetchBoilersData = () => {
        fetch("/admin/boilers")
            .then(response => response.json())
            .then(data => {
                setBoilers(data)
            })
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchBoilersData();
    }, []);

    const handleChange = (event) => {
        setBoilerId(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch(`/admin/works/${client}/new`, {
            method: 'POST',
            body: new FormData(document.getElementById('new-work-form'))
        })
            .then(response => response.json())
            .then(async (data) => {
                navigate(`/clients/${client}`);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <>
            <Grid container spacing={2} sx={{marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant="h4" gutterBottom justifyContent={"center"} sx={{marginTop: '10px'}}>
                        Nueva Obra
                    </Typography>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <form onSubmit={handleSubmit} id="new-work-form" name="work">
                        <InputLabel id="title-label">Título</InputLabel>
                        <TextField id="work-title" label="" required={true} name="work[title]" variant="standard"
                                   fullWidth={true}/>
                        <br/>
                        <br/>
                        <InputLabel id="description-label">Descripción</InputLabel>
                        <TextField id="work-description" label="" required={true} name="work[description]"
                                   variant="standard"
                                   multiline rows={4} fullWidth={true}/>
                        <br/>
                        <br/>
                        <FormControl fullWidth>
                            <InputLabel id="caldera-label">Caldera</InputLabel>
                            <Select
                                labelId="caldera-label"
                                id="caldera-select"
                                value={boilerid}
                                label="Caldera"
                                onChange={handleChange}
                                name={"work[boiler]"}
                            >
                                {boilers.map(boiler => (
                                    <MenuItem key={boiler.id} value={boiler.id}>{boiler.brand} {boiler.model}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br/>
                        <br/>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Button type="submit" variant={"contained"}>CREAR</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}
