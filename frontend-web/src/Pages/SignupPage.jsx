import React, { useEffect, useState } from 'react'
import { Grid, TextField, Typography, Button } from '@mui/material';
import logo from '../Assets/logo.png';
import doctor from '../Assets/doctor.png';
import medicine from '../Assets/medicine.png';
import medocare from '../Assets/medocare.png';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setupAuthHeaderForNetworkCalls } from "../Services/SetupAuthHeaders";
import { useApp } from "../Context/app-context";
import './SignUpPage.css';

const genders = ["Male", "Female", "Other"];

const cities = ["Vile Parle", "Andheri", "Vasai"];

const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");
const validPassword = new RegExp("^.*(?=.{8,}).*$");

const validPhone = new RegExp(
    /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
);

const initialState = {
    email: "",
    name: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
    location: "",
    confirmPassword: "",
};

const SignupPage = () => {

    
    const [formData, setFormData] = useState(initialState);

    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const handleClickShowPassword = () => setShowPwd((show) => !show);

    const navigate = useNavigate();
    const { setCurrentUser, setUserToken } = useApp();

    useEffect(() => {
        if (localStorage.getItem("isAuthorized")) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        !validEmail.test(formData.email)
            ? setEmailErr(true)
            : setEmailErr(false);

        !validPassword.test(formData.password)
            ? setPwdError(true)
            : setPwdError(false);

        !validPhone.test(formData.phone)
            ? setPhoneError(true)
            : setPhoneError(false);

        formData.password !== formData.confirmPassword
            ? setConfirmPasswordError(true)
            : setConfirmPasswordError(false);

        if (formData === initialState) {
            alert("Please fill all text fields!");
        } else if (
            !emailErr &&
            !pwdError &&
            !phoneError &&
            !confirmPasswordError
        ) {
            try {
                const {
                    data: { token, data, success },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/user/signup`,
                    {
                        email: formData.email,
                        fName: formData.name.split(" ")[0],
                        lName: formData.name.split(" ")[1],
                        phone: formData.phone,
                        dob: formData.dob,
                        gender: formData.gender,
                        location: formData.location,
                        password: formData.password,
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
                    // add toasts and feedback for backend errors
                }
            } catch (error) {
                console.log(error.response?.data.error);
            }
        }
    };

    return (
        <div class='signup-container'>
            <div class='signup-box'>
                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Email
                    </Typography>
                    <TextField
                        placeholder="Enter your email"
                        variant="outlined"
                        type="email"
                        fullWidth
                        value={formData.email}
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon color="disabled" />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 10,
                                color: "#000",
                                backgroundColor: "white",
                            },
                        }}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                        error={emailErr}
                    />
                    {emailErr && (
                        <Typography
                            variant="body2"
                            sx={{ marginLeft: 4, color: "#AF0D0D" }}
                        >
                            *Invalid email
                        </Typography>
                    )}
                </div>

                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Name
                    </Typography>
                    <TextField
                        placeholder="Enter your name"
                        variant="outlined"
                        type="name"
                        fullWidth
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutlineIcon color="disabled" />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 10,
                                color: "region",
                                backgroundColor: "white",
                            },
                        }}
                    />
                </div>
                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Phone number
                    </Typography>
                    <TextField
                        placeholder="Enter your number"
                        variant="outlined"
                        fullWidth
                        value={formData.phone}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocalPhoneOutlinedIcon color="disabled" />
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 10,
                                color: "region",
                                backgroundColor: "white",
                            },
                        }}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        error={phoneError}
                    />
                    {phoneError && (
                        <Typography
                            variant="body2"
                            sx={{ marginLeft: 4, color: "#AF0D0D" }}
                        >
                            *Invalid phone number
                        </Typography>
                    )}
                </div>
                <div class='dob-gender-grid'>
                    <div id='signup-dob'>
                        <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                            Date of Birth
                        </Typography>
                        <TextField
                            variant="outlined"
                            type="date"
                            value={formData.dob}
                            fullWidth
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    dob: e.target.value,
                                })
                            }
                            InputProps={{
                                sx: {
                                    borderRadius: 10,
                                    color: "#a4a4a4",
                                    backgroundColor: "white",
                                },
                            }}
                        />
                    </div>
                    <div id='signup-gender'>
                        <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                            Gender
                        </Typography>
                        <TextField
                            id="outlined-select-currency"
                            placeholder="Location"
                            select
                            value={formData.gender}
                            defaultValue="-"
                            fullWidth
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gender: e.target.value,
                                })
                            }
                            InputProps={{
                                sx: {
                                    backgroundColor: "white",
                                    borderRadius: 10,
                                },
                            }}
                        >
                            {genders.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Location
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        placeholder="Location"
                        select
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value,
                            })
                        }
                        InputProps={{
                            sx: {
                                borderRadius: 10,
                                color: "region",
                                backgroundColor: "white",
                            },
                        }}
                        fullWidth
                    >
                        {cities.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Password
                    </Typography>
                    <TextField
                        placeholder="Create password"
                        variant="outlined"
                        fullWidth
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        type={showPwd ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPwd ? (
                                            <VisibilityOff color="disabled" />
                                        ) : (
                                            <Visibility color="disabled" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 10,
                                color: "#000",
                                backgroundColor: "white",
                            },
                        }}
                        error={pwdError}
                    />
                    {pwdError && (
                        <Typography
                            variant="body2"
                            sx={{ marginLeft: 4, color: "#AF0D0D" }}
                        >
                            *The password must be minimum 8 characters
                        </Typography>
                    )}
                </div>
                <div class='signup-div'>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Confirm Password
                    </Typography>
                    <TextField
                        placeholder="Confirm password"
                        variant="outlined"
                        fullWidth
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                        type={showPwd ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPwd ? (
                                            <VisibilityOff color="disabled" />
                                        ) : (
                                            <Visibility color="disabled" />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 10,
                                color: "#000",
                                backgroundColor: "white",
                            },
                        }}
                        error={confirmPasswordError}
                    />
                    {confirmPasswordError && (
                        <Typography
                            variant="body2"
                            sx={{ marginLeft: 4, color: "#AF0D0D" }}
                        >
                            *The password does not match
                        </Typography>
                    )}
                </div>
                <Grid container justifyContent='center'>
                        <Button id='signup-btn'
                        variant='contained'
                            onClick={handleSubmit}
                        >
                            Signup
                        </Button>
                </Grid>
                <Grid container justifyContent='center'>
                    <Typography>Already have an account?<Button onClick={() => navigate='/login'}>LogIn</Button></Typography>
                </Grid>
            </div>
            <div class='signup-images'>
                <div>
                    <img id='logo-image' src={logo} alt="" />
                </div>
                <div>
                    <img id='doctor-image' src={doctor} alt="" />
                </div>
                <div>
                    <img id='medicine-image' src={medicine} alt="" />
                </div>
                <div>
                    <img id='medocare-image' src={medocare} alt="" />
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
