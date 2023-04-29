import { Box, Button } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

export default function Navbar2() {
  return (  
        <> 
            <Box width={'100%'} textAlign={'right'} paddingTop={'10px'}>
                <Button sx={{borderRadius:'50px',backgroundColor:'#C0EEF2',height:'29px',width:'92px',paddingRight:'10px', marginRight:'2rem',boxShadow:'0px 2px 7px black', textTransform:'none', color: 'black',}}>
                    <DarkModeOutlinedIcon fontSize='small' sx={{margin:'0 5px'}}/>
                    DARK
                </Button>
            </Box>
        </>
    )
}
