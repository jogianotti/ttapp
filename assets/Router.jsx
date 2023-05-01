import React from 'react';
import {createHashRouter, RouterProvider} from "react-router-dom";

import {Layout} from "./sections/layout/Layout";
import {Dashboard} from "./sections/dashboard/Dashboard";
import {Contacts} from "./sections/contacts/Contacts";
import {RouterMiddleware} from "./sections/router/RouterMiddleware";
import {Login} from "./sections/login/Login";
import {Logout} from "./sections/login/Logout";
import {ClientLayout} from "./sections/client/ClientLayout";
import {ClientDashboard} from "./sections/client/ClientDashboard";

const router = createHashRouter([
    {
        path: "/client",
        element: (
            <RouterMiddleware>
                <ClientLayout/>
            </RouterMiddleware>
        ),
        children: [
            {
                path: "./",
                element: <ClientDashboard/>,
            },
        ],
    },
    {
        path: "/",
        element: (
            <RouterMiddleware>
                <Layout/>
            </RouterMiddleware>
        ),
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/contacts",
                element: <Contacts/>,
            },
        ],
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
]);

export function Router() {
    return <RouterProvider router={router}/>;
}