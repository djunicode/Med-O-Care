import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import calender from '../Assets/calender.png';
import './PeriodTracker.css'

export default function PeriodTracker() {
  
  const [lastPeriod, setLastPeriod] = useState('');
  const [long, setLong] = useState('');
  const [length, setLength] = useState('');

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
              value={lastPeriod}
              fullWidth
              autoFocus
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setLastPeriod(e.target.value)}
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
              value={long}
              fullWidth
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setLong(e.target.value)}
          />      
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              Length of Menstrual Cycle
          </Typography>
        <TextField
              placeholder="Enter number"
              variant="outlined"
              type="number"
              value={length}
              fullWidth
              InputProps={{
                  sx: {
                      borderRadius: 10,
                      color: "#000",
                      backgroundColor: "white",
                  },
              }}
              onChange={(e) => setLength(e.target.value)}
          />      
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <Button id='track-btn'
          variant="contained"
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
