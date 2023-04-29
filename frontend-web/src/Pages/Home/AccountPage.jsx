import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Avatar, Grid, TextField, MenuItem } from '@mui/material';

const style = {
  position: 'relative',
  top: '48%',
  left: '86%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const genders = [ 'Male', 'Female', 'Other' ];

const AccountPage = ({open, close}) => {
  
  const [edit, setEdit] = React.useState(false);

  const handleEdit = () => {
      setEdit(true);
  }
  
  return (
    <div>
      <Modal
        open={open} 
      >
        <Paper sx={style}>
          <Grid container justifyContent='space-between'>
            <ArrowBackIosIcon onClick={close}/>
            <Button sx={{marginRight: 5, color: '#537FE7'}} onClick={handleEdit}>Edit</Button>
          </Grid>
          <Grid container spacing={1} justifyContent='space-between' sx={{margin: 'auto'}}>
            <Grid item xs={3}>
              <Avatar sx={{width: 65, height: 65}}>A</Avatar>
            </Grid>
            <Grid item xs={9}>
              <Typography variant='h6' sx={{fontWeight: 'bold'}}>xyz</Typography>
              <Typography variant='body2'>1234567890</Typography>
              <Typography variant='body2'>abc@gmail.com</Typography>
            </Grid>
          </Grid>
          <Grid container sx={{marginTop: 1, ml: 2}}>
            <Typography variant='h6' sx={{fontWeight: 'bold'}}>About You</Typography>
            <Grid item xs={12}>
              <Typography sx={{ marginLeft: 2, fontSize: 'medium'}}>Gender</Typography>
                    <TextField select defaultValue='Female' sx={{borderColor: '#537FE7'}}
                            InputProps={{
                              readOnly: edit ? false : true,
                              sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7'},}}>
                            {genders.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Age</Typography>
                    <TextField defaultValue='25' sx={{borderColor: '#537FE7'}}
                            InputProps={{
                              readOnly: edit ? false : true,
                              sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7' },}}>
                    </TextField>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Date of Birth</Typography>
                  <TextField variant="outlined" type='date' defaultValue="2003-12-23"
                  InputProps={{
                    readOnly: edit ? false : true,
                    sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300,},}} />
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Height</Typography>
                    <TextField defaultValue='5' sx={{borderColor: '#537FE7'}}
                            InputProps={{
                              readOnly: edit ? false : true,
                              sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7' },}}>
                    </TextField>
            </Grid>
          </Grid>
          <Button sx={{marginLeft: 2, color: '#537FE7', mt: 2}}>Logout</Button>
        </Paper>
      </Modal>
    </div>
  );
}

export default AccountPage;