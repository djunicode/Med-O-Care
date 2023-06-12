import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import hscore from '../Assets/hscore.png';
import './Healthscore.css';
import { useState } from 'react';


export default function HealthScore() {
  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    console.log(name, height, weight)
  }
  return (
    <Container>
        <Typography variant='h5' sx={{ color: "#537FE7", fontWeight: "bold" }}>
          Health Score Calculator
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
              <Grid container justifyConteny='space-between'>
                <Grid item xs={12}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Name</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      value={name}
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
                      onChange={(e) => setName(e.target.value)}
                  />     
                </Grid>
                <Grid container justifyContent='space-between' sx={{mt: '1%'}}>
                <Grid item xs={12} md={5}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Weight (in kgs)</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      value={weight}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      onChange={(e) => setWeight(e.target.value)}
                  />     
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Height(in cms)</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      value={height}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      onChange={(e) => setHeight(e.target.value)}
                  />
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
