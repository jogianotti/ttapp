import React from 'react';
import {createHashRouter, RouterProvider} from "react-router-dom";

import {Layout} from "./sections/layout/Layout";
import {Dashboard} from "./sections/dashboard/Dashboard";
import {Clients} from "./sections/clients/Clients";
import {Settings} from "./sections/settings/Settings";
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
                path: "/clients",
                element: <Clients/>,
            },
            {
                path: "/settings",
                element: <Settings/>,
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