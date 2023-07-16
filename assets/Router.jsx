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
import {NewClient} from "./sections/clients/NewClient";
import {OneClient} from "./sections/clients/OneClient";
import {NewWork} from "./sections/works/NewWork";
import {OneWork} from "./sections/works/OneWork";

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
                path: "/clients/new",
                element: <NewClient/>,
            },
            {
                path: "/clients/:id",
                element: <OneClient/>,
            },
            {
                path: "/clients/:client/works/:id",
                element: <OneWork />
            },
            {
                path: "/clients/:client/works/new",
                element: <NewWork />
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