import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import hscore from '../Assets/medicine.png';
import './Healthscore.css';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import axios from 'axios'

export default function Medicine() {
  const [medicineName, setMedicineName] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startTime, setStartTime] = useState('');
  const [countLeft, setCountLeft] = useState(0);

//   const handleSubmit = () => {
//     console.log(medicineName, frequency, new Date(startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }), countLeft)
//   }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(medicineName === '' || frequency === '' || startTime === '' || countLeft === '') {
      alert("Please fill all the fields!");
    }
    else {
        const time = new Date(startTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      const data = { medicineName, frequency, time, countLeft };
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/medicine/addmedicine`, data,
            { withCredentials: true }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))

    }
  }
  return (
    <Container>
        <Typography variant='h5' sx={{ color: "#537FE7", fontWeight: "bold" }}>
          Medicine
        </Typography>
      <div class='hsc-container'>
        <div id='hsc-form'>
            <Box 
            sx={{
              bgcolor: '#82aae36d', 
              border: '2px solid #537fe7', 
              borderRadius: '20px',
              p: '5% 10%'
            }}>
              <Grid container>
                <Grid item xs={12}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Medicine Name</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      value={medicineName}
                      fullWidth
                      autoFocus
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      onChange={(e) => setMedicineName(e.target.value)}
                  />     
                </Grid>
                <Grid container justifyContent='space-between' sx={{mt: '1%'}}>
                <Grid item xs={12} md={5}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Frequency</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      value={frequency}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      onChange={(e) => setFrequency(e.target.value)}
                  />     
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Medicine count</Typography>
                    <TextField
                      variant="outlined"
                      type="number"
                      value={countLeft}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      onChange={(e) => setCountLeft(e.target.value)}
                  />
                </Grid>
                </Grid>
                <Grid container justifyContent={'center'}>
                    <Grid item xs={12} align='center'>
                        <Typography sx={{ fontSize: "large" }}>Start Time</Typography>
                    </Grid>
                    <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimeField
                            value={startTime}
                            onChange={(e) => setStartTime(e)}
                            format="HH:mm"
                            InputProps={{
                                sx: {
                                    borderRadius: 10,
                                    color: "#000",
                                    backgroundColor: "white",
                                    border: '2px solid #537fe7',
                                },
                            }}
                        />
                    </LocalizationProvider>
                    </Grid>
                </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                  <Button id='track-btn'
                    variant="contained"
                    sx={{bgcolor: '#537FE7',
                        borderRadius: '20px',
                        m: '10px',
                        p: '8px 30px'}}
                      onClick={handleSubmit}
                  >
                      Submit
                    </Button>
                </Grid>
            </Box>
        </div>
        <div id='hsc-image'>
          <img src={hscore} alt="" id='hsc-img'/>
        </div>
        </div>
    </Container>
  )
}
