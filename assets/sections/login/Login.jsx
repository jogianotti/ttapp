import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
            <div>
                <form onSubmit={handleSubmit} id="form">
                    <h1 className="h3 mb-3 font-weight-normal">Acceso a clientes</h1>
                    <label htmlFor="inputEmail">Email</label>
                    <input type="email"
                           name="email"
                           id="inputEmail"
                           className="form-control"
                           autoComplete="email"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           required autoFocus/>
                    <label htmlFor="inputPassword">Clave</label>
                    <input type="password"
                           name="password"
                           id="inputPassword"
                           className="form-control"
                           autoComplete="current-password"
                           required/>
                    <button className="btn btn-lg btn-primary" type="submit">
                        Ingresar
                    </button>
                </form>
            </div>
        </>
    )
}
