import { Box, Grid, Button, Typography, Card } from "@mui/material";
import CardCarousel from "./CardCarousel";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import logo from '../../Components/images/logo.png'

export default function HomePage() {

  return (
    <Box>
      <Box>
      <Grid container >
  <Grid item xs={10}>
    <Typography variant='h6' sx={{color: '#537FE7', fontWeight: 'bold'}}>Buy medicines from..</Typography>
  </Grid>
  <Grid item xs={2}>
    <Button variant="contained" sx={{borderRadius: 10, backgroundColor: '#C0EEF2', color: 'black',}}><DarkModeOutlinedIcon sx={{marginRight: 1}}/>Dark</Button>
  </Grid>
  
</Grid>
        <Box sx={{marginTop: 5, marginLeft: 5}}>
          <CardCarousel/>
        </Box>
      </Box>
      <Box>
        <Typography variant='h6' sx={{color: '#537FE7', fontWeight: 'bold'}}>Mindful exercises..</Typography>
        <Grid container justifyContent='center'>
          <img src={logo} style={{height: 380, width: 600}}/>
        </Grid>
        <Box>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around">
        {Array.from(Array(6)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4}>
            <Card sx={{borderRadius: 3, border: 2}}>
              <Grid container spacing={2} justifyContent="space-around">
            <Grid item xs={2}>
    <img src={logo} style={{ height: 65, width: 65 }} />
  </Grid>
  <Grid item xs={10} md={8}>
    <Typography>32 Mindful Activities to find calm at any Age</Typography>
  </Grid>
  <Grid item xs={12}>
    <Typography>The practice of mindfulness is gaining popularity as a way to ease stress, sooth anxiey, </Typography>
  </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
        </Box>
      </Box>

    </Box>
  )
}
