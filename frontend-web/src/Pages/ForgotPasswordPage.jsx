import React, { useEffect } from "react";
import doctor from '../Assets/doctor.png';
import logo from '../Assets/logo.png';
import { Button, TextField, InputAdornment } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';
import './ForgotPasswordPage.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../Context/app-context";
import axios from "axios";
import { setupAuthHeaderForNetworkCalls } from "../Services/SetupAuthHeaders";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );

    const navigate = useNavigate();
    const { setUserToken } = useApp();

    useEffect(() => {
        if (localStorage.getItem("isAuthorized")) {
            navigate("/");
        }
    }, [navigate]);

    const submitForm = async (e) => {
        e.preventDefault();

        if (email.trim() === "" || !validEmail.test(email)) {
            alert("Please enter email correctly.");
        } else {
            try {
                const {
                    data: { token, message, success },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/forgotPSWD`,
                    {
                        email,
                    },
                    { withCredentials: true }
                );

                if (success) {
                    // message toast
                    setupAuthHeaderForNetworkCalls(token);
                    setUserToken(token);
                    localStorage.setItem("userToken", token);
                    navigate("/otp");
                }
            } catch (error) {
                console.log(error.response?.data.error);
            }
        }
    };
    return (
        <div class="grid-container">
            <br></br>
            <br></br>
            <br></br>
            <div id="forgotpass">
                <br></br>
                <br></br>
                <span
                    style={{
                        fontFamily: "Poppins",
                        width: "317",
                        height: "25",
                        fontSize: "32",
                    }}
                >
                    <b>Reset Password</b>
                </span>
                <br></br>
                <br></br>
                <br></br>
                Confirm your email address to receive an OTP.
                <br></br>
                <br></br>
                <br></br>
                Email
                <br></br>
                <TextField
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                    InputProps={{
                        style: {
                            border: "2px solid rgba(130, 170, 227, 1)",
                            borderRadius: "50px",
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 1)",
                            backgroundColor: "#FFFFFF",
                            height: "70",
                            width: "440.08",
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined />
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <br></br>
                <br></br>
                <Button
                    variant="contained"
                    type="submit"
                    id="submit"
                    onClick={submitForm}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                >
                    Send OTP
                </Button>
            </div>
            <div id="image">
                <img src={logo} alt="logo" height="310" width="395" />
                <img src={doctor} alt="doctor" height="210" width="365" />
            </div>
        </div>
    );
};
export default ForgotPasswordPage;
