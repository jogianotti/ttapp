import React from 'react';
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ConstructionIcon from '@mui/icons-material/Construction';

export function Dashboard() {
    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px', marginBottom: '80px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <h2>Dashboard</h2>
                    <Paper elevation={3} sx={{
                        width: 'auto',
                        height: '128px',
                        marginTop: '5px',
                        padding: '20px',
                        backgroundColor: '#80d39b'
                    }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="h5" sx={{textAlign: 'center'}}>
                                    CLIENTES
                                </Typography>
                                <Typography variant="h3" gutterBottom sx={{textAlign: 'center'}}>
                                    34
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{textAlign: 'center', verticalAlign: 'middle'}}>
                                {/*<Typography variant="h3" gutterBottom sx={{textAlign: 'center', verticalAlign: 'middle'}}>*/}
                                <PersonOutlineIcon sx={{fontSize: 100}}/>
                                {/*</Typography>*/}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={3} sx={{
                        width: 'auto',
                        height: '128px',
                        marginTop: '15px',
                        padding: '20px',
                        backgroundColor: '#247ba0'
                    }}>
                        <Grid container spacing={2}>

                            <Grid item xs={6} sx={{textAlign: 'center', verticalAlign: 'middle'}}>
                                <ConstructionIcon sx={{fontSize: 100}}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" sx={{textAlign: 'center'}}>
                                    OBRAS
                                </Typography>
                                <Typography variant="h3" gutterBottom sx={{textAlign: 'center'}}>
                                    40
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}