import doctor from "../Assets/doctor.png";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    Button,
    TextField,
    InputAdornment,
    Typography,
    IconButton,
} from "@mui/material";
import {
    EmailOutlined,
    LockOutlined,
    Google,
    VisibilityOff,
    Visibility,
} from "@mui/icons-material";

import "./LoginPage.css";
import { useApp } from "../Context/app-context";
import axios from "axios";
import { setupAuthHeaderForNetworkCalls } from "../Services/SetupAuthHeaders";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPwd, setShowPwd] = useState(false);

    const handleClickShowPassword = () => setShowPwd((show) => !show);

    const [isChecked, setIsChecked] = useState(false);

    const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
    );
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

        if (email.trim() === "" || !validEmail.test(email)) {
            alert("Please enter email correctly");
        } else if (
            password.trim() === "" ||
            password.trim().length < 8 ||
            !validPassword.test(password)
        ) {
            alert("Please enter password correctly");
        } else {
            try {
                const {
                    data: { token, data, success },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/login`,
                    {
                        email,
                        password,
                    },
                    { withCredentials: true }
                );

                if (success) {
                    setupAuthHeaderForNetworkCalls(token);
                    setUserToken(token);
                    localStorage.setItem("userToken", token);
                    setCurrentUser(data);
                    localStorage.setItem("currentUser", JSON.stringify(data));
                    localStorage.setItem("isAuthorized", true);
                    navigate("/");
                }
            } catch (error) {
                console.log(error.response?.data.error);
            }
        }
    };

    return (
        <div className="login-grid-container">
            <div id="logininfo">
                <span hidden id="error">
                    Invalid email or password!
                </span>
                <Typography fullWidth sx={{ marginLeft: 4, fontSize: "large" }}>
                    Email
                </Typography>
                <TextField
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: "2rem" }}
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
                                <EmailOutlined sx={{ ml: "5px" }} />
                            </InputAdornment>
                        ),
                    }}
                ></TextField>
                <Typography fullWidth sx={{ marginLeft: 4, fontSize: "large" }}>
                    Password
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
                <div clasName="login-flex-btns">
                    <div id="rm">
                        <input
                            type="checkbox"
                            onChange={() => {
                                setIsChecked(!isChecked);
                            }}
                        />
                        <span className={"login-checkbox"} aria-hidden="true">
                            Remember me
                        </span>
                    </div>
                    <div id="fp">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    id="submit"
                    fullWidth
                    onClick={submitForm}
                >
                    Login
                </Button>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            width: "195.08",
                            backgroundColor: "rgba(0, 0, 0, 0.75)",
                        }}
                    />
                    <div>
                        <p style={{ width: "50px", textAlign: "center" }}>OR</p>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            height: "1px",
                            width: "195.08",
                            backgroundColor: "rgba(0, 0, 0, 0.75)",
                        }}
                    />
                </div>
                <div id="google">
                    Login with Google&nbsp;
                    <Google />
                    {/* <Link to='' underline='none'></Link> */}
                </div>
                <div className="no-account">
                    Don't have an account?
                    <Link
                        to="/signup"
                        underline="always"
                        style={{ paddingLeft: "1rem" }}
                    >
                        Signup
                    </Link>
                </div>
            </div>
            <div id="image">
                <img
                    src={logo}
                    alt="logo"
                    style={{
                        height: "350px",
                        width: "350px",
                        objectFit: "cover",
                    }}
                />
                <img
                    src={doctor}
                    alt="doctor"
                    style={{
                        height: "280px",
                        width: "440px",
                        objectFit: "cover",
                    }}
                />
            </div>
        </div>
    );
};

export default LoginPage;
