import React, { useEffect } from "react";
import reminder from "../Assets/reminder.svg";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../Context/app-context";
import axios from "axios";

export const History = () => {
  const [all, setAll] = useState("");
  const navigate = useNavigate();
  const [data,setData] = useState()
  const navigateToUploadRecords =() =>{
    navigate("/uploadrecords")
  }



  return (
    <div>
      <table>
        <tr>
          <td>
            <div>
              <Box
                sx={{
                  paddingLeft: "92px",
                  paddingTop: "0px",
                }}
              >
                <IconButton onClick={navigateToUploadRecords}>
                  <ArrowBack
                    sx={{
                      color: "rgba(13, 13, 13, 0.75)",
                      paddingTop: "0px",
                    }}
                  >
                    {" "}
                  </ArrowBack>
                </IconButton>
              </Box>
              <Box
                sx={{
                  paddingLeft: "137px",
                  transform: "rorate(180deg)",
                }}
              >
                <img src={reminder} alt="reminder" height="166" width="185" />
              </Box>
            </div>
          </td>

          <td>
            <div>

              <table class="grid">
                <tr>
                  <td>
                    <div class="one">
                      <p
                        style={{
                          color: "rgba(83, 127, 231, 1)",
                          textAlign: "left",
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          fontSize: "18",
                          paddingLeft: "71px",
                        }}
                      >
                        History
                      </p>
                    </div>
                  </td>
                  <td>
                    <div class="two" style={{ paddingLeft: "460px" }}>
                      <FormControl
                        sx={{
                          m: 1,
                          p: 1,
                          minWidth: 120,
                        }}
                        size="small"
                      >
                        <InputLabel id="demo-select-small-label">
                          All
                        </InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={all}
                          label="All"
                          // onChange={handleChange}
                          sx={{
                            width: "169px",
                            height: "29px",
                            backgroundColor: "rgba(192, 238, 242, 1)",
                            color: "black",
                            borderRadius: "50px",
                          }}
                        >
                          <MenuItem id="prescrition">Prescription</MenuItem>
                          <MenuItem id="insurance">Insurance</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </td>
                </tr>
              </table>

              <div style={{ paddingLeft: "86px" }}>
                <table
                  id="content"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#FFFFFF",
                    width: "680px",
                    height: "65px",
                    boxShadow: "1px 1px 3px black",
                  }}
                >
                  <tr>
                    <td>
                      <div style={{ paddingLeft: "33px" }}>
                        <span
                          style={{
                            color: "rgba(0, 0, 0, 1)",
                            textAlign: "left",
                            fontFamily: "Poppins",
                            fontWeight: "medium",
                            fontSize: "16",
                          }}
                        >
                          Doctor's presc
                        </span>
                        <br></br>
                        <span
                          style={{
                            color: "rgba(0, 0, 0, 0.55)",
                            textAlign: "left",
                            fontFamily: "Poppins",
                            fontWeight: "medium",
                            fontSize: "13",
                          }}
                        >
                          Prescription
                        </span>
                      </div>
                    </td>

                    <td>
                      <div style={{ paddingLeft: "325px" }}>
                        <Button sx={{ color: "black" }}>Open</Button>
                        <Button
                          variant="contained"
                          sx={{
                            color: "white",
                            borderRadius: "50px",
                            backgroundColor: "rgba(83, 127, 231, 1)",
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>

                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default History;
