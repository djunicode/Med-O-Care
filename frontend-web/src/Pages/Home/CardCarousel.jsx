import { Typography, Card, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import logo from '../../Assets/logo.png'
import axios from 'axios'

const CardCarousel = () => {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        axios.get('https://dummyjson.com/posts')
        .then(res => setMedicines(res.data.posts))
      },[])

    const imageStyle = { height: 65, width: 65}
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 1400 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1400, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

  return (
    <>
    <Carousel responsive={responsive}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      autoPlay={true}
      autoPlaySpeed={2000}>
            {medicines?.map((medicine) => (
                    <Card sx={{height: 120, width: 220, backgroundColor: '#82AAE3', borderRadius: 5, display: 'flex', padding: 2}} key={medicine.id}>
                        <Box sx={{flex: 40}}>
                            <img src={logo} alt='' style={imageStyle}/>
                            <Typography variant='h6'>₹50</Typography>
                        </Box>
                        <Box sx={{flex: 60}}>
                            <Box>
                                <Typography variant='h6'>Dolo 650</Typography>
                                <Typography variant='h7'>Pharmeasy</Typography>
                            </Box>
                            <Box sx={{marginTop: 3}}>
                                <Typography variant='body2'>Contains 10 tablets</Typography>
                            </Box>
                        </Box>
                    </Card>
                )               
            )} 
        </Carousel>
        </>
        

  )
}

export default CardCarousel;


