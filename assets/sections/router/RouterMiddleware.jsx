import React from "react";

export function RouterMiddleware({children}) {

    let url = (localStorage.getItem('roles').includes('ROLE_ADMIN')) ? '/admin/check' : '/client/check';

    fetch(url, {
        method: 'GET'
    })
        .then(async (response) => {
            if (response.status === 401) {
                localStorage.removeItem("authenticated");
                localStorage.removeItem("username");
                localStorage.removeItem("roles");
            }
        })
        .catch(error => {

        });

    return <>{children}</>;
}