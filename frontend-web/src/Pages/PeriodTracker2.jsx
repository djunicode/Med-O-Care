import React from "react";
import { Grid, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import { ArrowBack } from "@mui/icons-material";
import calendar from "../Assets/calendar.svg";
import { Link } from "react-router-dom";

export const PeriodTracker2 = () => {
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
                spacing={0}
                sx={{
                    paddingLeft: "140px",
                }}
            >
                <Grid>
                    <Grid
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs("2022-05-27")} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid
                    sx={{
                        paddingLeft: "20px",
                    }}
                >
                    <Grid
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs("2022-06-27")} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid
                    sx={{
                        paddingLeft: "20px",
                    }}
                >
                    <Grid
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "5px",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar defaultValue={dayjs("2022-07-27")} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <Grid
                container
                spacing={2}
                sx={{
                    paddingLeft: "50px",
                }}
            >
                <Grid>
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
                <Grid
                    sx={{
                        paddingLeft: "250px",
                    }}
                >
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
                <Grid
                    sx={{
                        paddingLeft: "150px",
                    }}
                >
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
