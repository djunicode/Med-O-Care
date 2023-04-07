import React from "react";
import doctor from "../Components/images/doctor.png";
import logo from "../Components/images/logo.png";
import { Button, TextField, InputAdornment } from "@mui/material";
import { EmailOutlined } from "@mui/icons-material";
import "./ForgotPasswordPage.css";
import { useState } from "react";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [allEntry, setAllEntry] = useState([]);
    const validEmail = new RegExp(
        "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9-]+.[a-zA-Z]$"
    );

    const submitForm = (e) => {
        e.preventDefault();
        if (
            email.trim() === "" ||
            email.trim() == null ||
            !validEmail.test(email)
        ) {
            alert("Please enter email correctly.");
        } else {
            const newEntry = { id: new Date().getTime().toString(), email };
            setAllEntry([...allEntry, newEntry]);
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
