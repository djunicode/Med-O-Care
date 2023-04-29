import { Box, Grid, Button, Typography, Card } from "@mui/material";
import CardCarousel from "./CardCarousel";
import logo from '../../Assets/logo.png';
import YouTube from "react-youtube";

// var getYouTubeID = require("get-youtube-id");

export default function HomePage() {

  const opts = {
    height: '300',
    width: '500',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };


  return (
    <Box>
      <Box>
        <Box sx={{ marginLeft: 5 }}>
          <Typography variant='h6' sx={{ color: '#537FE7', fontWeight: 'bold' }}>Buy medicines from..</Typography>
        </Box>
        <Box sx={{ margin: 5 }}>
          <CardCarousel/>
        </Box>
      </Box>
      <Box sx={{ marginLeft: 5 }}>
        <Typography variant='h6' sx={{ color: '#537FE7', fontWeight: 'bold', marginBottom: 5 }}>Mindful exercises..</Typography>
        <Grid container justifyContent='center'>
            <YouTube videoId="4A0-aTZpR8M" opts={opts} onReady={(e) => e.target.pauseVideo()} />
        </Grid>
        <Box>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="space-around" sx={{ pt: 3, pr: 5 }}>
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4}>
                <Card sx={{ borderRadius: 3, border: 2 }}>
                  <Grid container spacing={2} justifyContent="space-around">
                    <Grid item xs={2}>
                      <img src={logo} style={{ height: 65, width: 65 }} alt=""/>
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
