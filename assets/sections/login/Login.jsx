import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Grid, TextField} from '@mui/material';
import {styled} from '@mui/material/styles';
import Logo from "../../logos/logos-TT-05.png";

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

    const RoundedTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '10% / 50%',
            }
        }
    });

    return (
        <>
            <br/>
            <Grid container
                  spacing={2}
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
            >
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <img src={Logo} height={'35px'} alt={'Logo'}/>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>
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
                        <RoundedTextField
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
                            sx={{borderRadius: '20px / 50%'}}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RoundedTextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="password"
                            label="clave"
                            name="password"
                            id="inputPassword"
                            autoComplete="current-password"
                            required
                            sx={{borderRadius: '20px / 50%'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="small"
                            variant="contained"
                            type="submit"
                            sx={{borderRadius: '20px / 50%'}}
                        >Ingresar</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
