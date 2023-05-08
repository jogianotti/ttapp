import React from "react";
import ReactDOM from "react-dom/client";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';
import "./styles/global.scss"
import {App} from "./App";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

require('bootstrap');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ScopedCssBaseline>
            <App/>
        </ScopedCssBaseline>
    </React.StrictMode>
);