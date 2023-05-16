import { Grid, Typography, TextField, MenuItem, Button } from '@mui/material';
import React from 'react'
import { useState } from 'react';

const cities = ['Vasai']
const Upload = () => {
    const [title, setTitle] = useState();
    const [select, setSelect] = useState();

  return (
      <Grid container 
      direction="column"
      justifyContent="center"
      >
      <Typography variant='h6' sx={{color: '#537FE7', fontWeight: 'bold'}}>Upload Documents</Typography>
        <Grid item>
                <Typography sx={{marginLeft: 2, fontSize: 'large' }}>Title</Typography>
                <TextField placeholder="Enter your name" variant="outlined" type='name' fullWidth value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 10, color: 'region', backgroundColor: 'white'},}} />
        </Grid>
        <Grid item>
            <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Select</Typography>
                    <TextField id="outlined-select-currency" placeholder="Location" select value={select}
                    onChange={(e) => setSelect(e.target.value)}
                            InputProps={{
                              sx: { borderRadius: 10, color: 'region', backgroundColor: 'white'},}} fullWidth>
                            {cities.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
        </Grid>
        <Grid sx={{border: 2, borderStyle: 'dashed', borderRadius: 2, marginTop: 2}} >
            <Button variant='contained' sx={{borderRadius: 10}}>Upload</Button>
        </Grid>
        <Grid variant='contained' sx={{borderRadius: 3, backgroundColor: 'white'}}>History</Grid>

    </Grid>
  )
}

export default Upload;