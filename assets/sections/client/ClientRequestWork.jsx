import React, {useEffect, useState} from "react";
import {
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputAdornment,
    InputLabel,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export function ClientRequestWork() {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles, setRoles] = useState(localStorage.getItem("roles") || []);
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [worksTypes, setWorksTypes] = useState([]);
    const [selectedFile, setSelectedFile] = useState('');
    const [requested, setRequested] = useState(false);
    const [selectedHeatingSystem, setSelectedHeatingSystem] = useState('');
    const [heatingSystems, setHeatingSystems] = useState([]);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_CLIENT')) {
            navigate("/login");
        }

        setWorksTypes([
            'Tradicional',
            'Prefabricada',
            'Casa forma',
            'Otra'
        ]);

        setHeatingSystems([
            'Radiadores',
            'Piso radiante'
        ]);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/client/request_work', {
            method: 'POST',
            body: new FormData(document.getElementById('form'))
        })
            .then(response => response.json())
            .then(async () => {
                setRequested(true);
            })
            .catch(error => {
                console.error('There was an error!', error);
                // @TODO show error
            });
    }

    const handleWorkTypeChange = (e) => {
        setSelectedWorkType(e.target.value);
    }

    const handleWorkPlanSelectChange = (e) => {
        setSelectedFile(e.target.value);
    }

    const handleWorkPlanSelectClick = (e) => {
        e.preventDefault();

        document.getElementById('work-plan').click();

    }

    const handleReturn = (e) => {
        e.preventDefault();

        navigate("/client");
    }

    const handleCancel = (e) => {
        e.preventDefault();

        navigate("/client");
    }

    return (
        <>
            <Grid container
                  spacing={2}
                  sx={{marginTop: '20px', marginBottom: '80px'}}
            >
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography color={'primary'}
                                variant={'body1'}
                                sx={{fontWeight: 'bold'}}
                                align={'center'}>
                        NUEVO PEDIDO DE OBRA
                    </Typography>
                    <Divider sx={{height: 2, backgroundColor: '#003566', border: '1px solid #003566', mb: 2}}/>

                    {requested && (<>
                        <Paper sx={{borderRadius: '20px / 20px', mb: 2, pt: 3, pb: 3, pl: 1, pr: 1}} elevation={3}>
                            <Typography color={'primary'}
                                        variant={'body1'}
                                        sx={{fontWeight: 'bold'}}
                                        align={'center'}>
                                SU PEDIDO HA SIDO CONFIRMADO. NOS COMUNICAREMOS CON UD. A LA BREVEDAD POSIBLE
                            </Typography>
                        </Paper>
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            type="button"
                            sx={{borderRadius: '20px / 50%'}}
                            onClick={handleReturn}
                        >VOLVER</Button>
                    </>)}
                    {!requested && (
                        <form onSubmit={handleSubmit} id="form" name="work_request">
                            <FormControl fullWidth size="small" sx={{mb: 2}} required={true}>
                                <InputLabel id="work-type-select-label">Typo de obra</InputLabel>
                                <Select
                                    labelId="work-type-select-label"
                                    id="work-type-select"
                                    value={selectedWorkType}
                                    label="Tipo de obra"
                                    onChange={handleWorkTypeChange}
                                    sx={{borderRadius: '20px / 50%'}}
                                    name={'work_request[workType]'}
                                >
                                    {worksTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small" sx={{mb: 2}} required={true}>
                                <InputLabel id="heating-system-select-label">Seleccione el sistema de
                                    calefacción</InputLabel>
                                <Select
                                    labelId="heating-system-select-label"
                                    id="heating-system-select"
                                    value={selectedHeatingSystem}
                                    label="Seleccione el sistema de calefacción"
                                    onChange={(e) => setSelectedHeatingSystem(e.target.value)}
                                    sx={{borderRadius: '20px / 50%'}}
                                    name={'work_request[heatingSystem]'}
                                >
                                    {heatingSystems.map((system) => (
                                        <MenuItem key={system} value={system}>
                                            {system}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small" sx={{mb: 2}} required={true}>
                                <FormLabel id="existing-installation-label">Tipo de instalación existente</FormLabel>
                                <RadioGroup row name={'work_request[existingInstallation]'}>
                                    <FormControlLabel value="Gas natural" control={<Radio size={'small'}/>}
                                                      label="Gas natural"/>
                                    <FormControlLabel value="Gas licuado" control={<Radio size={'small'}/>}
                                                      label="Gas licuado"/>
                                    <FormControlLabel value="Eléctrico" control={<Radio size={'small'}/>}
                                                      label="Eléctrico"/>
                                </RadioGroup>
                            </FormControl>
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                label="Ingrese dirección de la obra"
                                type="text"
                                name="work_request[address]"
                                id="inputAddress"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                sx={{mb: 2}}
                                InputProps={{
                                    sx: {borderRadius: '20px / 50%',}
                                }}
                            />
                            <input
                                type="file"
                                accept="application/pdf"
                                style={{display: 'none'}}
                                id="work-plan"
                                onChange={handleWorkPlanSelectChange}
                                name="file"
                            />
                            <TextField
                                onClickCapture={handleWorkPlanSelectClick}
                                fullWidth
                                readOnly
                                size="small"
                                sx={{mb: 2}}
                                variant="outlined"
                                type="text"
                                value={selectedFile}
                                label={'Cargar planos de obra'}
                                InputProps={{
                                    sx: {
                                        borderRadius: '20px / 50%',
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton edge="end">
                                                <UploadFileIcon/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Typography color={'primary'}
                                        variant={'body1'}
                                        sx={{fontWeight: 'bold', mb: 2}}
                                        align={'center'}>
                                REQUISITOS INDISPENSABLES
                            </Typography>
                            <p style={{fontSize: 'small'}}>Les solicitamos a nuestros clientes leer los requisitos de
                                obra que les facilitamos a continuación, donde podrán conocer los elementos necesarios
                                para poder realizar la obra técnica.</p>
                            <Button
                                fullWidth
                                size="small"
                                variant="contained"
                                type="button"
                                sx={{borderRadius: '20px / 20px', mb: 2, backgroundColor: 'grey'}}
                                endIcon={<FileDownloadIcon sx={{ml: 1}}/>}
                            >Requisitos de obra</Button>
                            <Button
                                fullWidth
                                size="small"
                                variant="contained"
                                type="submit"
                                sx={{borderRadius: '20px / 50%', mb: 2}}
                            >ENVIAR</Button>
                            <Button
                                fullWidth
                                size="small"
                                variant="outlined"
                                type="button"
                                sx={{borderRadius: '20px / 50%'}}
                                onClick={handleCancel}
                                color={'error'}
                            >CANCELAR</Button>
                        </form>
                    )}
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}