import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from '@mui/material';
import Logo from "../../logos/logos-TT-05.png";
import Typography from "@mui/material/Typography";

export function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (authenticated) {
            if (roles.includes('ROLE_ADMIN')) {
                navigate("/");
            } else if (roles.includes('ROLE_CLIENT')) {
                navigate("/client");
            }
        }
    }, [authenticated]);

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/login', {
            method: 'POST',
            body: new FormData(document.getElementById('form'))
        })
            .then(response => response.json())
            .then(async (data) => {
                localStorage.setItem("authenticated", true);
                localStorage.setItem("username", data.user);
                localStorage.setItem("roles", data.roles);

                if (data.roles.includes('ROLE_ADMIN')) {
                    navigate("/");
                } else if (data.roles.includes('ROLE_CLIENT')) {
                    navigate("/client");
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (<div>
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
            >
                <Grid container
                      spacing={2}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{marginTop: '20px'}}
                >
                    <Grid item xs={1} md={3}></Grid>
                    <Grid item xs={10} md={6}>
                        <img src={Logo} height={'35px'} alt={'Logo'}/>
                    </Grid>
                    <Grid item xs={1} md={3}></Grid>
                </Grid>

                <Grid container
                      spacing={2}
                      sx={{marginTop: '20px', marginBottom: '20px'}}
                >


                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Typography color={'primary'}
                                    variant={'h5'}
                                    sx={{fontWeight: 'bold', mb: 2}}
                                    align={'center'}>
                            Acceso a clientes
                        </Typography>
                        <form onSubmit={handleSubmit} id="form">
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="email"
                                type="email"
                                name="email"
                                id="inputEmail"
                                autoComplete="email"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required autoFocus
                                InputProps={{
                                    sx: {borderRadius: '20px / 50%', mb: 2}
                                }}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                type="password"
                                label="clave"
                                name="password"
                                id="inputPassword"
                                autoComplete="current-password"
                                required
                                InputProps={{
                                    sx: {borderRadius: '20px / 50%', mb: 2}
                                }}
                            />
                            <Button
                                fullWidth
                                size="small"
                                variant="contained"
                                type="submit"
                                sx={{borderRadius: '20px / 50%'}}
                            >Ingresar</Button>
                        </form>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </Grid>
        </div>
    )
}
