import React, {useEffect, useState} from 'react';
import {Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {useNavigate} from "react-router-dom";

export function Settings() {
    const navigate = useNavigate();
    const [boilers, setBoilers] = useState([])
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

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h4'}>
                        Opciones
                    </Typography>
                    <br/>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="stretch"
                        spacing={2}
                    >
                        <Paper>
                            <Typography variant={'overline'}>
                                Calderas
                            </Typography>

                            {/* @TODO add form to create boiler */}

                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Brand</TableCell>
                                            <TableCell>Model</TableCell>
                                            {/* @TODO add options to edit and delete */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {boilers.map((boiler) => (
                                            <TableRow
                                                key={boiler.id}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                <TableCell align="left">{boiler.brand}</TableCell>
                                                <TableCell align="left">{boiler.model}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Stack>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}