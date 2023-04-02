import React from 'react';
import doctor from '../Components/doctor.svg';
import logo from '../Components/logo.png';
import { Button, TextField } from '@mui/material';
import './OTPPage.css';
// import { color } from '@mui/system';

export const OTPPage = () => {
    return (
        <div class="grid-container">
            <br></br>
            <br></br>
            <br></br>
            <div id="otp">
                <br></br>
                <br></br>
                <b><span style={{
                    fontFamily: 'Poppins'
                }}>Reset Password</span></b>
                <br></br>
                <br></br>
                Enter the OTP received on your email address.
                <br></br>
                <div class="grid-container1">
                    <div id='eotp'>
                        <label><b>Enter OTP</b></label>
                    </div>
                    <div class='blank'>

                    </div>
                </div>
                <div id="box">
                    <TextField
                        sx={{ width: 65, height: 50, padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                    <TextField
                        sx={{ width: 65, height: 50,padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                    <TextField
                        sx={{ width: 65, height: 50, padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                    <TextField
                        sx={{ width: 65, height: 50, padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                    <TextField
                        sx={{ width: 65, height: 50, padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                    <TextField
                        sx={{ width: 65, height: 50, padding: 0.3 }}
                        InputProps={{
                            style: {
                                color: 'black',
                                backgroundColor: 'white',
                                border: 'solid 2px rgba(83, 127, 231, 1)',
                                borderRadius: '15'
                            }
                        }}></TextField>
                </div>
                <div class="grid-container1">
                    <div class='blank'>

                    </div>
                    <div id='resend'>
                        <label style={{
                        color: 'rgba(0, 0, 0, 0.35)'
                    }}>Resend OTP in </label>
                    </div>
                </div>
                <Button variant="contained" type="submit" id="submit"
                    sx={{ width: 440.08, height: 40, padding: 1, margin: 2 }}
                >Continue</Button>
            </div>
            <div id='image'>
                <img src={logo} alt="logo" height='310' width='395' />
                <img src={doctor} alt="doctor" height='210' width='365' />
            </div>
        </div>
    )
}

export default OTPPage;