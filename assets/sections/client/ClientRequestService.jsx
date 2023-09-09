import React, {useEffect, useState} from "react";
import {
    Button,
    Divider,
    FormControl,
    FormGroup,
    Grid,
    InputAdornment,
    InputLabel,
    Select,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import EventIcon from '@mui/icons-material/Event';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import dayjs from "dayjs";
import {MobileDatePicker} from "@mui/x-date-pickers";

export function ClientRequestService() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);
    const [selectedBrand, setSelectedBrand] = useState('');
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [lastVisitYear, setLastVisitYear] = useState('');
    const [lastVisitMonth, setLastVisitMonth] = useState('');
    const [lastVisitDay, setLastVisitDay] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_CLIENT')) {
            navigate("/login");
        }

        fetchBoilersData();
    }, []);

    const fetchBoilersData = () => {
        fetch("/client/boilers")
            .then(response => response.json())
            .then(data => {
                let brands = [];
                let models = [];
                data.forEach((boiler) => {
                    if (!brands.includes(boiler.brand)) {
                        brands.push(boiler.brand);
                    }

                    if (!models.includes(boiler.brand)) {
                        models[boiler.brand] = [boiler];
                    } else {
                        models[boiler.brand].push(boiler);
                    }
                });

                setBrands(brands);
                setModels(models);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/client/request_service', {
            method: 'POST',
            body: new FormData(document.getElementById('form'))
        })
            .then(response => response.json())
            .then(async () => {
                // @TODO show success message
            })
            .catch(error => {
                console.error('There was an error!', error);
                // @TODO show error
            });
    }

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    }

    useEffect(() => {
        setLastVisitYear(dayjs(selectedDate).format('YYYY'));
        setLastVisitMonth(dayjs(selectedDate).format('M'));
        setLastVisitDay(dayjs(selectedDate).format('D'));
    }, [selectedDate]);

    const handleCapture = (e) => {
        // @TODO Upload file
        setSelectedImage(e.target.value);
    }

    const handleCameraClick = (e) => {
        document.getElementById('boiler-picture').click();
    }

    return (
        <>
            <Grid container
                  spacing={2}
                  sx={{marginTop: '20px', marginBottom: '80px'}}
            >
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <form onSubmit={handleSubmit} id="form" name="service_request">
                        <Typography color={'primary'}
                                    variant={'body1'}
                                    sx={{fontWeight: 'bold'}}
                                    align={'center'}>
                            SOLICITAR SERVICIO TECNICO
                        </Typography>
                        <Divider sx={{height: 2, backgroundColor: '#003566', border: '1px solid #003566', mb: 2}}/>
                        <FormControl fullWidth size="small" sx={{mb: 2}} required={true}>
                            <InputLabel id="brand-select-label">Seleccionar marca de caldera</InputLabel>
                            <Select
                                labelId="brand-select-label"
                                id="brand-select"
                                value={selectedBrand}
                                label="Seleccionar marca de caldera"
                                onChange={handleBrandChange}
                                sx={{borderRadius: '20px / 50%'}}
                                name={'service_request[brand]'}
                            >
                                {brands.map((brand) => (
                                    <MenuItem key={brand} value={brand}
                                              sx={{backgroundColor: brand === 'PEISA' ? '#db0320' : brand === 'Caldaia' ? '#233f88' : 'none'}}>
                                        {brand}
                                    </MenuItem>
                                ))}
                                <MenuItem key={'Otra'} value={'Otra'} autoFocus>Otra</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            label="Ingrese modelo (opcional)"
                            type="text"
                            name="service_request[model]"
                            id="inputModel"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            sx={{mb: 2}}
                            InputProps={{
                                sx: {borderRadius: '20px / 50%',}
                            }}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="text"
                            label="Escriba el código de falla (opcional)"
                            name="service_request[error]"
                            id="inputError"
                            sx={{mb: 2}}
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                            InputProps={{
                                sx: {borderRadius: '20px / 50%',}
                            }}
                        />
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            id="filled-textarea"
                            label="Descripción de falla"
                            placeholder=""
                            multiline
                            rows={4}
                            sx={{mb: 2}}
                            required={true}
                            name="service_request[description]"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            InputProps={{
                                sx: {borderRadius: '25px / 25px',}
                            }}
                        />
                        <input type={'hidden'} id={'lastVisitYear'} name={'service_request[lastVisit][year]'}
                               value={lastVisitYear}/>
                        <input type={'hidden'} id={'lastVisitMonth'} name={'service_request[lastVisit][month]'}
                               value={lastVisitMonth}/>
                        <input type={'hidden'} id={'lastVisitDay'} name={'service_request[lastVisit][day]'}
                               value={lastVisitDay}/>
                        <FormGroup sx={{mb: 2}}>
                            <InputLabel id="start-date-label">Fecha de la última visita (aproximada)</InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                                <MobileDatePicker onChange={(newValue) => setSelectedDate(newValue)}
                                                  value={selectedDate}
                                                  slotProps={{
                                                      textField: {
                                                          size: 'small',
                                                          InputProps: {
                                                              sx: {borderRadius: '20px / 50%',},
                                                              readOnly: true,
                                                              endAdornment: (
                                                                  <InputAdornment position="end">
                                                                      <EventIcon edge="end">
                                                                          <CameraAltOutlinedIcon/>
                                                                      </EventIcon>
                                                                  </InputAdornment>
                                                              ),
                                                          }
                                                      },
                                                  }}
                                />
                            </LocalizationProvider>
                        </FormGroup>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            style={{display: 'none'}}
                            id="boiler-picture"
                            onChange={handleCapture}
                            name="file"
                        />
                        <InputLabel htmlFor="outlined-adornment-password">Subir imagen de la caldera</InputLabel>
                        <TextField
                            onClick={handleCameraClick}
                            fullWidth
                            size="small"
                            sx={{mb: 2}}
                            variant="outlined"
                            type="text"
                            value={selectedImage}
                            InputProps={{
                                sx: {
                                    borderRadius: '20px / 50%',
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <CameraAltOutlinedIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                readOnly: true,
                            }}
                        />
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            type="submit"
                            sx={{borderRadius: '20px / 50%'}}
                        >ENVIAR</Button>
                    </form>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}