import React, { useState } from 'react'
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import logo from '../Components/images/logo.png';
import doctor from '../Components/images/doctor.png';
import InputAdornment from '@mui/material/InputAdornment';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

const genders = [ 'Male', 'Female', 'Other' ];
    
const cities = [ 'Vile Parle', 'Andheri', 'Vasai' ];

const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
const validPassword = new RegExp('^.*(?=.{8,}).*$');

const validPhone = new RegExp(/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/);

const initialState = {  
  email: '', name: '', password: '', phone: '', dob: '', gender: '', location: '', confirmPassword: ''
};

const SignupPage = () => {
  const paperStyle = { bgcolor: '#82AAE3', marginLeft: 15, marginTop: 5, border: 1, width: '40%', borderColor: '#537FE7', borderRadius: 2 };
  const logoStyle = { height: '50vh', width: '100%', marginLeft: 100 };
  const gridStyle = { paddingLeft: 10, paddingRight: 10, paddingTop: 0.7 }
  const imageStyle = { height: 320, width: '100%', marginLeft: 100 }
  
  const [formData, setFormData] = useState(initialState);

  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  

  const handleClickShowPassword = () => setShowPwd((show) => !show);

  const handleSubmit = () => {
    !validEmail.test(formData.email) ? setEmailErr(true) : setEmailErr(false);

    !validPassword.test(formData.password)? setPwdError(true) : setPwdError(false);

    !validPhone.test(formData.phone)? setPhoneError(true) : setPhoneError(false);

    formData.password!==formData.confirmPassword ? setConfirmPasswordError(true) : setConfirmPasswordError(false)

    if(formData===initialState) {
      alert("Please fill all text fields!")
    }
  }

  return (
        <Box style={{ display: 'flex' }}>
            <Box sx={paperStyle}>
              <Grid sx={gridStyle}>
                <Typography sx={{marginLeft: 2, fontSize: 'large' }}>Email</Typography>
                <TextField placeholder="Enter your email" variant="outlined"  type='email' fullWidth value={formData.email} autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <MailOutlineIcon color="disabled"/>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 10, color: "#000", backgroundColor: 'white'},}} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                  error={emailErr}/>
                  {emailErr && <Typography variant='body2' sx={{marginLeft: 4, color: '#AF0D0D'}}>*Invalid email</Typography>}
              </Grid>

              <Grid sx={gridStyle}>
                <Typography sx={{marginLeft: 2, fontSize: 'large' }}>Name</Typography>
                <TextField placeholder="Enter your name" variant="outlined" type='name' fullWidth value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value})}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <PersonOutlineIcon color="disabled"/>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 10, color: 'region', backgroundColor: 'white'},}} />
              </Grid>
              <Grid sx={gridStyle}>
                <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Phone number</Typography>
                <TextField placeholder="Enter your number" variant="outlined" fullWidth value={formData.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <LocalPhoneOutlinedIcon color="disabled"/>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 10, color: 'region', backgroundColor: 'white'},}} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value})}
                  error={phoneError}/>
                  {phoneError && <Typography variant='body2' sx={{marginLeft: 4, color: '#AF0D0D'}}>*Invalid phone number</Typography>}
              </Grid>
              <Grid sx={{...gridStyle, display: 'flex',}}>
                <Grid sx={{flex: 60}}>
                <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Date of Birth</Typography>
                  <TextField variant="outlined" type='date' value={formData.dob} 
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value})}
                  InputProps={{
                    sx: { borderRadius: 10, color: '#a4a4a4', backgroundColor: 'white', width: 200},}} />
                </Grid>
                <Grid sx={{flex: 40}}>
                <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Gender</Typography>
                  <TextField id="outlined-select-currency" placeholder="Location" select value={formData.gender} defaultValue='-'
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value})}
                        InputProps={{
                          sx: { backgroundColor: 'white', width: 200, borderRadius: 10},}} >
                        {genders.map((option) => (
                    <MenuItem key={option} value={option} >
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                </Grid>
              </Grid>
              <Grid sx={gridStyle}>
              <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Location</Typography>
                    <TextField id="outlined-select-currency" placeholder="Location" select value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value})}
                            InputProps={{
                              sx: { borderRadius: 10, color: 'region', backgroundColor: 'white'},}} fullWidth>
                            {cities.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
              </Grid>
              <Grid sx={gridStyle}>
                <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Password</Typography>
                <TextField placeholder="Create password" variant="outlined" fullWidth value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value})} 
                type={showPwd ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff color='disabled' /> : <Visibility color='disabled' />}
                </IconButton>
                        
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 10, color: "#000", backgroundColor: 'white'},}}  error={pwdError}/>
                  { pwdError && <Typography variant='body2' sx={{marginLeft: 4, color: '#AF0D0D'}}>*The password must be minimum 8 characters</Typography>}
              </Grid>
              <Grid sx={gridStyle}>
                <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Confirm Password</Typography>
                <TextField placeholder="Confirm password" variant="outlined" fullWidth value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value})} 
                type={showPwd ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPwd ? <VisibilityOff color='disabled' /> : <Visibility color='disabled' />}
                </IconButton>
                        
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 10, color: "#000", backgroundColor: 'white'},}}  error={confirmPasswordError}/>
                  { confirmPasswordError && <Typography variant='body2' sx={{marginLeft: 4, color: '#AF0D0D'}}>*The password does not match</Typography>}
              </Grid>
              <Grid sx={gridStyle}>
                <Button variant='contained' sx={{width: '250px', height: 50, borderRadius: 10, marginLeft: 10 }} fullWidth onClick={handleSubmit}>Signup</Button>
              </Grid>
            </Box>
            <Box>
              <div>
              <img src={logo} style={logoStyle} alt=""/>
              </div>
              <div>
              <img src={doctor} style={imageStyle} alt=""/>
              </div>
            </Box>
        </Box>
  )
}

export default SignupPage;