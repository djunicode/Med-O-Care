import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import dayjs from 'dayjs';
import { ArrowBack } from "@mui/icons-material";
import calendar from "../Assets/calendar.svg";
import { Link } from "react-router-dom";
import axios from 'axios';

export const PeriodTracker2 = () => {

    const [monthOne, setMonthOne] = useState([]);
     const [monthTwo, setMonthTwo] = useState([]);
     const [monthThree, setMonthThree] = useState([]);
    // console.log(monthOne)
    var arr1 = [], arr2 = [], arr3 = [];
    
    for(let i=0; i<monthOne.length; i++) {
        arr1[i] = dayjs(monthOne[i]);
    }
    for(let i=0; i<monthTwo.length; i++) {
        arr2[i] = dayjs(monthTwo[i]);
    }
    for(let i=0; i<monthThree.length; i++) {
        arr3[i] = dayjs(monthThree[i]);
    }
    // console.log(arr1, arr2, arr3)
    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API_ENDPOINT}/user/getPeriodDates`,
                { withCredentials: true }
          )
          .then(res => {
               setMonthOne(res.data.period_dates[0])
               setMonthTwo(res.data.period_dates[1])
               setMonthThree(res.data.period_dates[2])
          })
      },[])
    

    return (
        <div>
            <span
                style={{
                    color: "rgba(83, 127, 231, 1)",
                    paddingLeft: "90px",
                    paddingTop: "149px",
                    fontSize: "18",
                    fontWeight: "bold",
                    fontFamily: "Poppins",
                }}
            >
                Period tracker
            </span>
            <br></br>
            <br></br>
            <Grid
                container
                justifyContent={'space-evenly'}
                spacing={3}
                rowGap={3}
                mt={'1%'}
            >
                {/* <Grid item> */}
                    <Grid item
                        // xs={12} md={4}
                        // width={'300px'}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangeCalendar calendars={1}
                            value={arr1}
                            readOnly
                        />
                        </LocalizationProvider>
                    </Grid>
                {/* </Grid> */}
                {/* <Grid item
                    sx={{
                        paddingLeft: "20px",
                    }}
                > */}
                    <Grid item
                        // xs={12} md={4}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangeCalendar calendars={1}
                                value={arr2}
                                readOnly
                            />
                        </LocalizationProvider>
                    </Grid>
                {/* </Grid> */}
                {/* <Grid
                    sx={{
                        paddingLeft: "20px",
                    }}
                > */}
                    <Grid item
                        // xs={12} md={4}
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateRangeCalendar calendars={1}
                                value={arr3}
                                readOnly
                            />
                        </LocalizationProvider>
                    </Grid>
                {/* </Grid> */}
            </Grid>
            <br></br>
            <br></br>
            <Grid
                container
                justifyContent={'space-between'}
                spacing={2}
            >
                <Grid item xs={12} md={3} align={'center'}>
                    <Link to="/period-tracker">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                borderRadius: "50px",
                                border: " 2px solid rgba(83, 127, 231, 1)",
                                backgroundColor: "rgba(83, 127, 231, 1)",
                                fontFamily: "Poppins",
                                fontSize: "18",
                                fontWeight: "medium",
                                color: "white",
                                height: "50px",
                                width: "196px",
                            }}
                        >
                            <ArrowBack />
                            Start Over
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={3} align={'center'}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: "50px",
                            border: " 2px solid rgba(83, 127, 231, 1)",
                            backgroundColor: "white",
                            fontFamily: "Poppins",
                            fontSize: "18",
                            fontWeight: "medium",
                            color: "rgba(83, 127, 231, 1)",
                            width: "320px",
                            height: "50px",
                        }}
                    >
                        Send reminder through mail
                    </Button>
                </Grid>
                <Grid item xs={12} md={3} align={'center'}>
                    <br></br>
                    <img
                        src={calendar}
                        alt="calendar"
                        style={{
                            height: "219px",
                            width: "268px",
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default PeriodTracker2;
