import React, { useEffect } from "react";
import doctor from "../Assets/doctor.png";
import logo from "../Assets/logo.png";
import {
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
} from "@mui/material";
import {
    EmailOutlined,
    LockOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
import "./ForgotPasswordPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../Context/app-context";
import axios from "axios";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPwd, setShowPwd] = useState(false);

    const handleClickShowPassword = () => setShowPwd((show) => !show);

    const validPassword = new RegExp("^.*(?=.{8,}).*$");

    const navigate = useNavigate();
    const { setCurrentUser, setUserToken } = useApp();

    useEffect(() => {
        if (localStorage.getItem("isAuthorized")) {
            navigate("/");
        }
    }, [navigate]);

    const submitForm = async (e) => {
        e.preventDefault();

        if (!validPassword.test(password)) {
            alert("Please enter a valid password!");
        } else if (password !== confirmPassword) {
            alert("Passwords don't match!");
        } else {
            try {
                const {
                    data: { token, message, success },
                } = await axios.put(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/editUserInfo`,
                    {
                        password,
                    },
                    { withCredentials: true }
                );

                if (success) {
                    // message toast, password changed login now
                    navigate("/login");
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
                <br></br>
                <Typography fullWidth sx={{ marginLeft: 4 }}>
                    Create new Password
                </Typography>
                <TextField
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPwd ? "text" : "password"}
                    fullWidth
                    InputProps={{
                        style: {
                            border: "2px solid rgba(130, 170, 227, 1)",
                            borderRadius: "50px",
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 1)",
                            backgroundColor: "#FFFFFF",
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ ml: "5px" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{ mr: "0.5px" }}
                                >
                                    {showPwd ? (
                                        <VisibilityOff color="disabled" />
                                    ) : (
                                        <Visibility color="disabled" />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <Typography fullWidth sx={{ marginLeft: 4 }}>
                    Confirm Password
                </Typography>
                <TextField
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={showPwd ? "text" : "password"}
                    fullWidth
                    InputProps={{
                        style: {
                            border: "2px solid rgba(130, 170, 227, 1)",
                            borderRadius: "50px",
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 1)",
                            backgroundColor: "#FFFFFF",
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined sx={{ ml: "5px" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    sx={{ mr: "0.5px" }}
                                >
                                    {showPwd ? (
                                        <VisibilityOff color="disabled" />
                                    ) : (
                                        <Visibility color="disabled" />
                                    )}
                                </IconButton>
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
                    Set password
                </Button>
            </div>
            <div id="image">
                <img src={logo} alt="logo" height="310" width="395" />
                <img src={doctor} alt="doctor" height="210" width="365" />
            </div>
        </div>
    );
};

export default ResetPassword;
