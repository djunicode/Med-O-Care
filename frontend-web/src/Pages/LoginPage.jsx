import React from 'react';
import './LoginPage.css';
import { Button, TextField, InputAdornment } from '@mui/material';
import { EmailOutlined, LockOutlined, VisibilityOffOutlined, Google } from '@mui/icons-material';
import doctor from '../Components/doctor.svg';
import logo from '../Components/logo.png';
import { Link } from "react-router-dom";
import { useState } from "react";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);

    const [isChecked, setIsChecked] = useState(false);

    const validEmail = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9-]+.[a-zA-Z]$");
    const validPassword = new RegExp("^.*(?=.{8,}).*$");

    var errorE = document.getElementById('email');
    var errorP = document.getElementById("password");
    var errorS = document.getElementById('error');

    const submitForm = (e) => {
        e.preventDefault();
        if (email.trim() === "" || email.trim() == null || !validEmail.test(email)) {
            alert("Please enter email correctly");
        }
        else if (password.trim() === "" || password.trim() == null || password.trim().length < 8 ||
            !validPassword.test(password)) {
            alert("Please enter password correctly");
        }
        else {
            const newEntry = { id: new Date().getTime().toString(), email, password };
            setAllEntry([...allEntry, newEntry]);
        }
    }

    return (
        <div class="grid-container">

            <div id="logininfo">
                <span hidden id='error'>Invalid email or password!</span>
                <br></br>
                Email
                <br></br>
                <TextField
                    id="email"
                    placeholder='Enter your email'
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                    InputProps={{
                        style: {
                            border: '2px solid rgba(130, 170, 227, 1)',
                            borderRadius: '50px',
                            textAlign: 'center',
                            color: 'rgba(0, 0, 0, 1)',
                            backgroundColor: '#FFFFFF',
                            height: '70',
                            width: '440.08'
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailOutlined />
                            </InputAdornment>
                        ),
                    }}>

                </TextField>
                <br></br>
                <br></br>
                Password
                <br></br>
                <TextField
                    id="password"
                    type='password'
                    autoComplete="off"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                    InputProps={{
                        style: {
                            border: '2px solid rgba(130, 170, 227, 1)',
                            borderRadius: '50px',
                            textAlign: 'center',
                            color: 'rgba(0, 0, 0, 1)',
                            backgroundColor: '#FFFFFF'
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <VisibilityOffOutlined />
                            </InputAdornment>
                        ),
                    }}>
                </TextField>
                <br></br>
                <div class="grid-container1">
                    <div id='rm'>
                        <input
                            type="checkbox"
                            onChange={() => {
                                setIsChecked(!isChecked);
                            }}
                        />
                        <span
                            className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
                            aria-hidden="true"
                        />
                        Remember me
                    </div>
                    <div id='fp'>
                        <Link to='/forgotpassword'>Forgot Password?</Link>
                    </div>
                </div>
                <Button variant="contained" type="submit" id="submit" onClick={submitForm}
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                >Login</Button>
                <br></br>
                <br></br>
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                    <div style={{ flex: 1, height: '1px', width: '195.08', backgroundColor: 'rgba(0, 0, 0, 0.75)' }} />

                    <div>
                        <p style={{ width: '50px', textAlign: 'center' }}>OR</p>
                    </div>

                    <div style={{ flex: 1, height: '1px', width: '195.08', backgroundColor: 'rgba(0, 0, 0, 0.75)' }} />
                </div>
                <br></br>
                <div id='google'
                    sx={{
                        width: 440.08,
                        height: 40,
                        padding: 1,
                        margin: 2
                    }}
                    InputProps={{
                        style: {
                            textAlign: 'center',
                            width: 440.08,
                            height: 40
                        }
                    }}>
                    Login with Google&nbsp; <Google />
                    {/* <Link to='' underline='none'></Link> */}
                </div>
                <br></br>
                <div>
                    Don't have an account? <Link to='/signup' underline='always'>Signup</Link>
                </div>
            </div>
            <div id='image'>
                <img src={logo} alt="logo" height='310' width='395' />
                <img src={doctor} alt="doctor" height='210' width='365' />
            </div>
        </div>
    )
}

export default LoginPage;