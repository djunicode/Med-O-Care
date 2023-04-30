import { Grid, Typography, Card } from "@mui/material";
import CardCarousel from "./CardCarousel";
import logo from '../../Assets/logo.png';
import YouTube from "react-youtube";
import './Home.css';
// var getYouTubeID = require("get-youtube-id");

export default function HomePage() {

  const opts = {
    height: '300',
    width: '400',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };


  return (
    <div>
      <div>
        <div sx={{ marginLeft: 5 }}>
          <Typography variant='h6' sx={{ color: '#537FE7', fontWeight: 'bold' }}>Buy medicines from..</Typography>
        </div>
        <div sx={{ margin: 5 }}>
          {/* <CardCarousel/> */}
        </div>
      </div>
      <div>
        <Typography variant='h6' sx={{ color: '#537FE7', fontWeight: 'bold', marginBottom: 5 }}>Mindful exercises..</Typography>
        <Grid container justifyContent='center'>
            <YouTube videoId="4A0-aTZpR8M" opts={opts} onReady={(e) => e.target.pauseVideo()} />
        </Grid>
        <div>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }} justifyContent="space-around" sx={{ pt: 3, pr: 5 }}>
            {Array.from(Array(6)).map((_, index) => (
              <Grid item xs={2} sm={4} md={4}>
                <Card sx={{ borderRadius: 3, border: 2 }}>
                  <Grid container spacing={2} justifyContent="space-around" sx={{mt: 1}}>
                    <Grid item xs={2}>
                      <img src={logo} style={{ height: 65, width: 65 }} alt=""/>
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <Typography>32 Mindful Activities to find calm at any Age</Typography>
                    </Grid>
                  </Grid>
                    <Grid item xs={12} sx={{mr: 2, ml: 2}}>
                      <Typography>The practice of mindfulness is gaining popularity as a way to ease stress, sooth anxiey, </Typography>
                    </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

    </div>
  )
}
