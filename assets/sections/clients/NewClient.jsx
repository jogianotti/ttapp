import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    InputAdornment,
    InputBase,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/es';
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const products = [
    'Caldera de pie',
    'Climatizador de piscina',
    'Radiador ',
    'Termostato de ambiente'
];

export function NewClient() {
    const navigate = useNavigate();
    const [idtype, setIdtype] = useState('dni');
    const [startDateSelectedYear, setStartDateSelectedYear] = useState('');
    const [startDateSelectedMonth, setStartDateSelectedMonth] = useState('');
    const [startDateSelectedDay, setStartDateSelectedDay] = useState('');
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }
    }, []);

    const handleChange = (event) => {
        setIdtype(event.target.value);
    };

    const handleStartDateChange = (selectedDate) => {
        setStartDateSelectedYear(dayjs(selectedDate).format('YYYY'));
        setStartDateSelectedMonth(dayjs(selectedDate).format('M'));
        setStartDateSelectedDay(dayjs(selectedDate).format('D'));
    };

    function handleSubmit(e) {
        e.preventDefault();

        fetch('/admin/clients/new', {
            method: 'POST',
            body: new FormData(document.getElementById('new-client-form'))
        })
            .then(response => response.json())
            .then(async (data) => {
                navigate('/clients');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant="h4" gutterBottom justifyContent={"center"} sx={{marginTop: '10px'}}>
                        Nuevo cliente
                    </Typography>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <form onSubmit={handleSubmit} id="new-client-form" name="client">
                        <InputLabel id="id-label">Identificador</InputLabel>
                        <TextField
                            id="client-identifier"
                            label=""
                            required={true}
                            name={"client[" + idtype + "]"}
                            variant="standard"
                            fullWidth={true}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FormControl variant="standard">
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={idtype}
                                                label="Tipo"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'dni'}>DNI</MenuItem>
                                                <MenuItem value={'cuit'}>CUIT</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <br/>
                        <br/>
                        <InputLabel id="email-label">Email</InputLabel>
                        <TextField id="client-email" label="" required={true} name="client[email]" variant="standard"
                                   type={"email"} fullWidth={true}/>
                        <br/>
                        <br/>
                        <InputLabel id="name-label">Nombre</InputLabel>
                        <TextField id="client-name" label="" required={true} name="client[name]" variant="standard"
                                   fullWidth={true}/>
                        <br/>
                        <br/>
                        <InputLabel id="phone-number-label">Teléfono</InputLabel>
                        <TextField id="client-phone-number" label="" required={true} name="client[phoneNumber]"
                                   variant="standard"
                                   fullWidth={true}/>
                        <br/>
                        <br/>
                        <FormGroup>
                            <InputLabel id="start-date-label">Fecha de inicio</InputLabel>
                            <InputBase type="hidden" name="client[startDate][year]"
                                       value={startDateSelectedYear}></InputBase>
                            <InputBase type="hidden" name="client[startDate][month]"
                                       value={startDateSelectedMonth}></InputBase>
                            <InputBase type="hidden" name="client[startDate][day]"
                                       value={startDateSelectedDay}></InputBase>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <DatePicker onChange={handleStartDateChange}/>
                            </LocalizationProvider>
                        </FormGroup>
                        <br/>
                        <br/>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                        >
                            <Button type="submit" variant={"contained"}>CREAR</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}
