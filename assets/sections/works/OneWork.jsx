import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Accordion, AccordionDetails, AccordionSummary, Grid, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {WorkEventEditor} from './WorkEventEditor';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {timelineItemClasses} from "@mui/lab";

import './work.css';

export function OneWork() {
    const {client, id} = useParams();
    const navigate = useNavigate();
    const [work, setWork] = useState({})
    const [events, setEvents] = useState([])
    const [authenticated] = useState(localStorage.getItem("authenticated") || false);
    const [roles] = useState(localStorage.getItem("roles") || []);
    const [expanded, setExpanded] = React.useState(false);

    const fetchWorkData = () => {
        fetch(`/admin/works/${client}/${id}`)
            .then(response => response.json())
            .then(data => {
                setWork(data)
            })
    }

    const fetchEventsData = () => {
        fetch(`/admin/works/${client}/${id}/events`)
            .then(response => response.json())
            .then(data => {
                setEvents(data)
            })
    }

    useEffect(() => {
        if (!authenticated || !roles.includes('ROLE_ADMIN')) {
            navigate("/login");
        }

        fetchWorkData();
        fetchEventsData();
    }, []);

    const handleChange = () => (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    const handleRegister = () => () => {
        setExpanded(false);
        fetchEventsData();
    }

    return (
        <>
            <Grid container spacing={2} sx={{marginTop: '10px'}}>
                <Grid item xs={1} md={3}></Grid>
                <Grid item xs={10} md={6}>
                    <Typography variant={'h4'}>
                        {work.title}
                    </Typography>
                    <Grid item>
                        <br/>
                        <Accordion expanded={expanded} onChange={handleChange()}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Registrar evento</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <WorkEventEditor client={client} work={id} onRegister={handleRegister()}/>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <br/>
                    <Grid item>
                        {events.length > 0 && (
                            <Timeline
                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 0,
                                    },
                                }}
                            >
                                {events.map(event => (
                                    <>
                                        <TimelineItem>
                                            <TimelineSeparator>
                                                <TimelineDot/>
                                                <TimelineConnector/>
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <Typography variant={'p'}
                                                            color="textSecondary">{event.date}</Typography>
                                                <Grid item xs={10} md={6} className={'event_content'}>
                                                    <div dangerouslySetInnerHTML={{__html: event.content}}></div>
                                                </Grid>
                                            </TimelineContent>
                                        </TimelineItem>
                                    </>
                                ))}

                            </Timeline>
                        )}
                    </Grid>
                </Grid>
                <Grid item xs={1} md={3}></Grid>
            </Grid>
        </>
    )
}
