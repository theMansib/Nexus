import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from './Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import iCalendarPlugin from '@fullcalendar/icalendar'
import { motion } from "framer-motion"
// import calEvents from './calendar/cal.ics'

const API_KEY = "AIzaSyAh5r_-OWMGjDBaPv3QOc9Yl1yUBvYyL2E";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
    paper: {
        padding: 10,
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}));


export default function DashboardCards({ setCal }) {
    const calendarEl = useRef()

    useEffect(() => {
        let cal = new Calendar(calendarEl.current, {
            plugins: [dayGridPlugin, timeGridPlugin, iCalendarPlugin],
            initialView: 'dayGridMonth',
            nowIndicator: true,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            events: {
                url: "api/get_cal",
                format: 'ics'
            },
            eventTimeFormat: {
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'long'
            }
        });
        setCal(cal)
        cal.refetchEvents()
        cal.render()
        console.log(cal)

    }, [])

    const variants = {
        initial: { opacity: 0},
        open: { opacity: 1 },
        closed: { opacity: 0 },
    }
    return (
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <Grid
            container
            direction="row"
            ref={(el) => {
                if (el) {
                    el.style.setProperty('align-items', "center", 'important');
                    el.style.setProperty('justify-content', "center", 'important');
                }
            }}
            style={{ paddingLeft: 20, paddingRight: 20 }}
            spacing={3}
        >
            <Grid
                container
                direction="row"
                ref={(el) => {
                    if (el) {
                        el.style.setProperty('align-items', "center", 'important');
                        el.style.setProperty('justify-content', "center", 'important');
                    }
                }}
                style={{ paddingLeft: 20, paddingRight: 20 }}
                spacing={3}
            >
                <Grid item xs={12} justify="center" alignItems="flex-start" >
                    {/* <main className={classes.contentShift}> */}
                    <Box>
                        <h1 style={{ textAlign: "center" }}>Howdy Ria, welcome to Nexus!</h1>
                        <br />
                        <h2 style={{ textAlign: "center" }}>Scheduled Events:</h2>
                        <div ref={calendarEl} style={{ marginLeft: 20, marginRight: 20 }}></div>
                    </Box>
                    {/* </main> */}
                </Grid>
            </Grid>
        </Grid>
        </motion.div>
    )
}