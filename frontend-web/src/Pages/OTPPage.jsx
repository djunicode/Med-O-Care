import React, { useEffect, useState } from "react";
import doctor from "../Assets/doctor.png";
import logo from "../Assets/logo.png";
import { Button, TextField } from "@mui/material";
import "./OTPPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useApp } from "../Context/app-context";
import { setupAuthHeaderForNetworkCalls } from "../Services/SetupAuthHeaders";
// import { color } from '@mui/system';

const OTPPage = () => {
    const [otpValues, setOtpValues] = useState({
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: "",
    });

    const navigate = useNavigate();
    const { setCurrentUser, setUserToken } = useApp();

    useEffect(() => {
        if (localStorage.getItem("isAuthorized")) {
            navigate("/");
        }
    }, [navigate]);

    const submitForm = async (e) => {
        e.preventDefault();

        if (
            otpValues.first.trim().length !== 1 ||
            otpValues.second.trim().length !== 1 ||
            otpValues.third.trim().length !== 1 ||
            otpValues.fourth.trim().length !== 1 ||
            otpValues.fifth.trim().length !== 1 ||
            otpValues.sixth.trim().length !== 1
        ) {
            alert("Please enter a valid OTP!");
        } else {
            try {
                const {
                    data: { token, message, success },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/verifyOTP`,
                    {
                        otp: Number(
                            otpValues.first +
                                otpValues.second +
                                otpValues.third +
                                otpValues.fourth +
                                otpValues.fifth +
                                otpValues.sixth
                        ),
                    },
                    { withCredentials: true }
                );

                if (success) {
                    // message toast
                    setupAuthHeaderForNetworkCalls(token);
                    setUserToken(token);
                    localStorage.setItem("userToken", token);
                    navigate("/reset-password");
                }
            } catch (error) {
                console.log(error.response?.data.error);
            }
        }
    };

    return (
        <div class="otp-grid-container">
            <br></br>
            <br></br>
            <br></br>
            <div id="otp">
                <br></br>
                <br></br>
                <b>
                    <span
                        style={{
                            fontFamily: "Poppins",
                        }}
                    >
                        Reset Password
                    </span>
                </b>
                <br></br>
                <br></br>
                Enter the OTP received on your email address.
                <br></br>
                <div class="otp-grid-container1">
                    <div id="eotp" style={{ marginLeft: "8rem" }}>
                        <label>
                            <b>Enter OTP</b>
                        </label>
                    </div>
                </div>
                <div id="box" style={{ marginBottom: "1rem" }}>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                first: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                second: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                third: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                fourth: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                fifth: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                    <TextField
                        sx={{
                            width: 65,
                            height: 50,
                            padding: 0.3,
                        }}
                        type="number"
                        onChange={(e) =>
                            setOtpValues({
                                ...otpValues,
                                sixth: e.target.value,
                            })
                        }
                        InputProps={{
                            style: {
                                color: "black",
                                backgroundColor: "white",
                                border: "solid 2px rgba(83, 127, 231, 1)",
                                borderRadius: "15",
                                paddingLeft: "0.5rem",
                                fontSize: "1.2rem",
                            },
                        }}
                    ></TextField>
                </div>
                <div class="otp-grid-container1">
                    <div id="resend">
                        <Link
                            to="/forgot-password"
                            style={{
                                color: "rgba(0, 0, 0, 0.35)",
                                textDecoration: "none",
                                marginLeft: "12rem",
                            }}
                        >
                            Resend OTP
                        </Link>
                    </div>
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    id="submit"
                    onClick={submitForm}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                >
                    Continue
                </Button>
            </div>
            <div id="image">
                <img src={logo} alt="logo" height="310" width="395" />
                <img src={doctor} alt="doctor" height="210" width="365" />
            </div>
        </div>
    );
};

export default OTPPage;
