import React from "react";
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
    VisibilityOffOutlined,
    Google,
    VisibilityOff,
    Visibility,
} from "@mui/icons-material";
import doctor from "../Components/images/doctor.png";
import logo from "../Components/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const [showPwd, setShowPwd] = useState(false);

    const handleClickShowPassword = () => setShowPwd((show) => !show);

    const [isChecked, setIsChecked] = useState(false);

    const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9-]+.[a-zA-Z]$"
    );
    const validPassword = new RegExp("^.*(?=.{8,}).*$");

    var errorE = document.getElementById("email");
    var errorP = document.getElementById("password");
    var errorS = document.getElementById("error");

    const submitForm = (e) => {
        e.preventDefault();
        if (
            email.trim() === "" ||
            email.trim() == null ||
            !validEmail.test(email)
        ) {
            alert("Please enter email correctly");
        } else if (
            password.trim() === "" ||
            password.trim() == null ||
            password.trim().length < 8 ||
            !validPassword.test(password)
        ) {
            alert("Please enter password correctly");
        } else {
            const newEntry = {
                id: new Date().getTime().toString(),
                email,
                password,
            };
            setAllEntry([...allEntry, newEntry]);
        }
    };

    return (
        <div class="login-grid-container">
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
                    type="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <div class="login-flex-btns">
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
