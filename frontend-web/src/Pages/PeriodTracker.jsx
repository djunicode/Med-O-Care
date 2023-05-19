import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import calender from '../Assets/calender.png';
import './PeriodTracker.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PeriodTracker() {
  
  const [lastDay, setLastDay] = useState('');
  const [howLong, setHowLong] = useState('');
  const [duration, setDuration] = useState('');

  const navigate = useNavigate();

  const handleTrack = async (e) => {
    e.preventDefault();

    if(lastDay === '' || howLong === '' || duration === '') {
      alert("Please fill all the fields!");
    }
    else {
      const data = { lastDay, howLong, duration };
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/user/periodTracker`, data,
            { withCredentials: true }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))

      navigate('/periodtracker2')
    }
  }

  return (
    <div class='pt-container'>
      <div id='pt-title'>
        <Typography variant='h6' sx={{ color: '#537FE7', fontWeight: 'bold' }}>Period Tracker</Typography>
      </div>
    <div id='pt-paper-style'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              When did you get your last period?
          </Typography>
        <TextField
              variant="outlined"
              type="date"
              value={lastDay}
              fullWidth
              autoFocus
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setLastDay(e.target.value)}
          />      
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              How long does your period last?
          </Typography>
        <TextField
              placeholder="Enter number"
              variant="outlined"
              type="number"
              value={howLong}
              fullWidth
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setHowLong(e.target.value)}
          />      
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              duration of Menstrual Cycle
          </Typography>
        <TextField
              placeholder="Enter number"
              variant="outlined"
              type="number"
              value={duration}
              fullWidth
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setDuration(e.target.value)}
          />      
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Button id='track-btn'
          variant="contained"
          onClick={handleTrack} 
        >
            Track
          </Button>
      </Grid>
      
    </div>
    <div class='calender-img'>
        <img src={calender} alt=''/>
    </div>
</div>
  )
}
