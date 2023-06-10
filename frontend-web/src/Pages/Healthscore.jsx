import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material'
import React from 'react'
import hscore from '../Assets/hscore.png';

export default function HealthScore() {
  return (
    <Container>
        <Typography variant='h5' sx={{ color: "#537FE7", fontWeight: "bold" }}>
          Health Score Calculator
        </Typography>
        <Grid container display='flex' justifyContent='flex-start'>
            <Box 
            sx={{
              bgcolor: '#82aae36d', 
              border: '2px solid #537fe7', 
              borderRadius: '20px',
              p: '2%'
            }}>
              <Grid container alignItems='space-around'>
                <Grid item xs={12}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Name</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      // value={lastDay}
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
                      // onChange={(e) => setLastDay(e.target.value)}
                  />     
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Weight</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      select
                      // value={lastDay}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      // onChange={(e) => setLastDay(e.target.value)}
                  />     
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>Height</Typography>
                    <TextField
                      variant="outlined"
                      type="name"
                      select
                      // value={lastDay}
                      fullWidth
                      InputProps={{
                          sx: {
                              borderRadius: 10,
                              color: "#000",
                              backgroundColor: "white",
                              border: '2px solid #537fe7'
                          },
                      }}
                      // onChange={(e) => setLastDay(e.target.value)}
                  />     
                </Grid>
                </Grid>
                <Grid container justifyContent='center'>
                  <Button id='track-btn'
                    variant="contained"
                    sx={{bgcolor: '#537FE7',
                        borderRadius: '20px',
                        m: '10px',
                        p: '8px 30px'}}
                  >
                      Submit
                    </Button>
                </Grid>
            </Box>
        </Grid>
        <Grid container display="flex" justifyContent='flex-end'>
          <img src={hscore} alt=""/>
        </Grid>
    </Container>
  )
}
