import React from "react";
import {useNavigate} from "react-router-dom";

export function RouterMiddleware({children}) {
    const navigate = useNavigate();

    return <>{children}</>;
}