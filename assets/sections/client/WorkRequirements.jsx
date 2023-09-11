import React, {useEffect, useState} from "react";
import {Button, Divider, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export function WorkRequirements() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_CLIENT')) {
            navigate("/login");
        }
    }, []);

    const handleReturn = (e) => {
        e.preventDefault();

        navigate("/client");
    }

    return (
        <>
            <Grid container
                  spacing={2}
                  sx={{marginTop: '20px', marginBottom: '80px'}}
            >
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography color={'primary'}
                                variant={'body1'}
                                sx={{fontWeight: 'bold'}}
                                align={'center'}>
                        REQUISITOS DE OBRA
                    </Typography>
                    <Divider sx={{height: 2, backgroundColor: '#003566', border: '1px solid #003566', mb: 2}}/>


                    <p style={{fontSize: 'small'}}>Les solicitamos a nuestros clientes leer los requisitos de
                        obra que les facilitamos a continuación, donde podrán conocer los elementos necesarios
                        para poder realizar la obra técnica.</p>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="button"
                        sx={{borderRadius: '20px / 20px', mb: 2, backgroundColor: 'grey'}}
                        endIcon={<FileDownloadIcon sx={{ml: 1}}/>}
                    >REQUISITOS GENERALES DE OBRA</Button>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="button"
                        sx={{borderRadius: '20px / 20px', mb: 2, backgroundColor: 'grey'}}
                        endIcon={<FileDownloadIcon sx={{ml: 1}}/>}
                    >MATERIALES ADICIONALES DE OBRA</Button>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="button"
                        sx={{borderRadius: '20px / 20px', mb: 2, backgroundColor: 'grey'}}
                        endIcon={<FileDownloadIcon sx={{ml: 1}}/>}
                    >OPCIONALES</Button>
                    <Button
                        fullWidth
                        size="small"
                        variant="contained"
                        type="button"
                        sx={{borderRadius: '20px / 50%', mt: '30%'}}
                        onClick={handleReturn}
                    >VOLVER</Button>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}