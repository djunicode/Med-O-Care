import React from 'react';
import { Grid, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { ArrowBack } from "@mui/icons-material";
import calendar from "../Assets/calendar.svg";
import { Link } from "react-router-dom";
import './PeriodTracker2.css';

export const PeriodTracker2 = () => {
    return (
        <div className='period-container'>
            <span
                id="heading"
            >Period tracker</span>
            <br></br>
            <br></br>
            <Grid
                id="date"
                container spacing={0} sx={{
                    paddingLeft: '140px'
                }}>
                <Grid>
                    <Grid
                        id="cal1"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '5px'
                        }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs('2022-05-27')} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid
                    id="cal2"
                    sx={{
                        paddingLeft: '20px'
                    }}>
                    <Grid sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs('2022-06-27')} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid
                    id="cal3"
                    sx={{
                        paddingLeft: '20px'
                    }}>
                    <Grid sx={{
                        backgroundColor: 'white',
                        borderRadius: '5px'
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs('2022-07-27')} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Grid
                id="two-buttons"
                container spacing={2}>
                <Grid id="startover">
                    <Link to='/periodtracker'>
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                textDecoration: 'none',
                                borderRadius: '50px',
                                border: ' 2px solid rgba(83, 127, 231, 1)',
                                backgroundColor: "rgba(83, 127, 231, 1)",
                                fontFamily: "Poppins",
                                fontSize: "18",
                                fontWeight: "medium",
                                color: "white",
                                height: '50px',
                                width: '196px',
                                marginBottom: '20px',
                            }}
                        >
                            <ArrowBack />
                            Start Over
                        </Button>
                    </Link>
                </Grid>
                <Grid
                    id="sendrem"
                    sx={{
                        paddingLeft: "250px",
                    }}>
                    <Button
                        variant='contained'
                        fullWidth
                        sx={{
                            borderRadius: '50px',
                            border: ' 2px solid rgba(83, 127, 231, 1)',
                            backgroundColor: "white",
                            fontFamily: "Poppins",
                            fontSize: "18",
                            fontWeight: "medium",
                            color: 'rgba(83, 127, 231, 1)',
                            width: '320px',
                            height: '50px'
                        }}>Send reminder through mail
                    </Button>
                </Grid>
                <Grid >
                    <br></br>
                    <div class='calender-img'>
                        <img src={calendar} alt='' />
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default PeriodTracker2;