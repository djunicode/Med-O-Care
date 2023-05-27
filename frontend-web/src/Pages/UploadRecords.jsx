import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import documentplusimage from "../Assets/documentplusimage.png"

export default function UploadRecords() {
  const [title, setTitle] = useState();
  const gridStyle = { paddingLeft: 10, paddingRight: 10, paddingTop: 0.7 };
  
  const dealingWithSave = () => {};

  return (
    <>

        <Box margin={"0px auto"} sx={{ width: "50%" }}>

          <Typography sx={{fontWeight:'bolder' ,marginLeft:'4rem', color:'#537FE7'} }>
            Upload Documents
          </Typography>

          <Grid sx={gridStyle}>
            <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              Title
            </Typography>
            <TextField
              placeholder="Enter title for document"
              variant="outlined"
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 10,
                  color: "#000",
                  backgroundColor: "white",
                },
              }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>

          <Grid sx={gridStyle}>
            <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              Select type of document
            </Typography>
            <TextField
              id="documentType"
              placeholder="Type of document"
              select
              InputProps={{
                placeholder:"Type of document",
                sx: {
                  borderRadius: 10,
                  color: "region",
                  backgroundColor: "white",
                },
              }}
              fullWidth
            >
              <MenuItem>Insurance records</MenuItem>
              <MenuItem> Medical records</MenuItem>
            </TextField>
          </Grid>

          <Grid sx={gridStyle}>
            <Box
              width={"380px"}
              height={"140px"}
              sx={{
                border: "2px dashed",
                borderRadius: "20px",
                marginLeft: "2.4rem",
                marginTop: "20px",
              }}
              >
              <Button
                variant="contained"
                sx={{
                  width: "196px",
                  height: "51px",
                  margin: "2.8rem 5.7rem",
                  borderRadius: "50px",
                  backgroundColor: "#537FE7",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Upload
              </Button>
            </Box>
            
          </Grid>

          <Grid sx={gridStyle}>
            <Box marginTop={"2rem"}>
              <Button
                variant="contained"
                fullWidth
                onClick={dealingWithSave}
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#537FE7",
                  width: "196px",
                  height: "51px",
                  color: "white",
                  marginLeft: "8.3rem",
                  textTransform: "none",
                }}
              >
                Save
              </Button>
            </Box>
          </Grid>

          <Grid sx={gridStyle}>
            <Button
              endIcon={<ArrowForwardIcon fontSize="large" />}
              sx={{
                marginTop: "2rem",
                backgroundColor: "white",
                width: "470px",
                height: "57px",
                borderRadius: "10px",
                border: "solid 1px",
                textTransform: "none",
              }}
            >
              History
            </Button>
          </Grid>
        </Box>

          <img src={documentplusimage} id='documentfirstimage'  alt="document"></img>
          <img src={documentplusimage} id='documentsecondimage' alt='document'></img>
    </>
  );
}
