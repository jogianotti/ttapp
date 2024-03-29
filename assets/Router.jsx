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
import {ClientRequestService} from "./sections/client/ClientRequestService";
import {ClientRequestWork} from "./sections/client/ClientRequestWork";
import {WorkRequirements} from "./sections/client/WorkRequirements";
import {WorkRequests} from "./sections/requests/WorkRequests";
import {ServiceRequests} from "./sections/requests/ServiceRequests";

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
                path: "/client",
                element: <ClientDashboard/>,
            },
            {
                path: "/client/request_service",
                element: <ClientRequestService/>
            },
            {
                path: "/client/request_work",
                element: <ClientRequestWork/>
            },
            {
                path: "/client/work_requirements",
                element: <WorkRequirements/>
            }
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
                element: <OneWork/>
            },
            {
                path: "/clients/:client/works/new",
                element: <NewWork/>
            },
            {
                path: "/settings",
                element: <Settings/>,
            },
            {
                path: "/service_requests",
                element: <ServiceRequests/>,
            },
            {
                path: "/work_requests",
                element: <WorkRequests/>,
            },
        ],
    },
    {
        path: "/login",
        element: (
            <RouterMiddleware>
                <Login/>
            </RouterMiddleware>
        ),
    },
    {
        path: "/logout",
        element: <Logout/>,
    },
]);

export function Router() {
    return <RouterProvider router={router}/>;
}