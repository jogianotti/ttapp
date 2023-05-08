import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from '@mui/material';

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
    }, [authenticated])
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

    return (
        <>
            <br/>
            <br/>
            <form onSubmit={handleSubmit} id="form">
                <Grid container
                      spacing={2}
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                >
                    <Grid item xs={6}>
                        <h1 className="h3 mb-3 font-weight-normal">Acceso a clientes</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            label="Email"
                            type="email"
                            name="email"
                            id="inputEmail"
                            autoComplete="email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required autoFocus
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            type="password"
                            label="Clave"
                            name="password"
                            id="inputPassword"
                            autoComplete="current-password"
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" type="submit">Ingresar</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
