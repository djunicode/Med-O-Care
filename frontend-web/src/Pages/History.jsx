import React, { useEffect, useMemo, useRef } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";

export const History = () => {
  const renderCount = useRef(0);
  const validTypesOfSorting = [
    "All Documents",
    "Frequently visited",
    "Latest uploaded",
    "Medical Files",
    "Insurance Files",
  ];
  const [data, setData] = useState([]);
  const perFormSorting = () => {
    if (typeOfSorting === "Frequently visited") {
      // Sort files based on frequency of visits
      setData((prevData) => {
        // Sort the files based on the visitCount property in descending order
        const sortedData = [...prevData].sort(
          (a, b) => b.visitCount - a.visitCount
        );
        return sortedData;
      });
    } else if (typeOfSorting === "Latest uploaded") {
      // Sort files based on the date of upload
      setData((prevData) => {
        // Sort the files based on the dateOfUpload property in descending order
        const sortedData = [...prevData].sort(
          (a, b) => new Date(b.dateOfUpload) - new Date(a.dateOfUpload)
        );
        return sortedData;
      });
    } else if (typeOfSorting === "Medical Files") {
      // Filter and display only medical files
      setData((prevData) => {
        // Filter the files based on their type or any other condition
        const filteredData = prevData.filter(
          (file) => file.fileType === "Medical"
        );
        return filteredData;
      });
    } else if (typeOfSorting === "Insurance Files") {
      // Filter and display only insurance files
      setData((prevData) => {
        // Filter the files based on their type or any other condition
        const filteredData = prevData.filter(
          (file) => file.fileType === "Insurance"
        );
        return filteredData;
      });
    } else {
      // Display all documents
      // No additional sorting or filtering needed
    }
  };

  const dealingWithSorting = () => {
    console.log(typeOfSorting);
    const previousType = localStorage.getItem("typeOfDisplay");
    if (previousType && validtypes(previousType)) {
      setTypeOfSorting(previousType);
    } else {
      setTypeOfSorting("Frequently visited");
    }
    perFormSorting();
  };

  const validtypes = (previousType) => {
    let isValid = false;
    validTypesOfSorting.forEach((type) => {
      if (previousType === type) {
        isValid = true;
      }
    });
    return isValid;
  };
  const [typeOfSorting, setTypeOfSorting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const previousType = localStorage.getItem("typeOfDisplay");
    getData();

    //initial render vala case kyuki sirph tabhi hume data lana hai varna nhi lana hai
    if (previousType && validtypes(previousType) && renderCount.current === 1) {
      setTypeOfSorting(previousType);
    }
    dealingWithSorting();
    setIsLoading(false);
  }, []);

  useMemo(() => {
    renderCount.current++;
    if (renderCount.current === 1) {
      return null;
    }
    setIsLoading(true);
    dealingWithSorting();
    setIsLoading(false);
  }, [typeOfSorting]);

  const navigate = useNavigate();
  let medicalFileCount, insuranceFileCount;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const getData = async () => {
    const options = {
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/getFiles`,
      method: "GET",
    };
    const response = await axios.request(options);
    medicalFileCount = response.data.medicalFileCount;
    insuranceFileCount = response.data.insuranceFileCount
    console.log(medicalFileCount);
    console.log(insuranceFileCount);
    if (response.data.success) {
      setData(response.data.data.files);
    } else {
      alert("OH NOOOO 🫢");
    }
  };

  const navigateToUploadRecords = () => {
    navigate("/uploadrecords");
  };

  const dealingWithOpeningAPdf = (nameOfFile) => {
    navigate(`view:${nameOfFile}`);
  };

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
                          value={typeOfSorting}
                          label="Filter"
                          defaultValue="All Documents"
                          onChange={(e) => {
                            localStorage.setItem(
                              "typeOfDisplay",
                              e.target.value
                            );
                            setTypeOfSorting(e.target.value);
                          }}
                          sx={{
                            width: "169px",
                            height: "29px",
                            backgroundColor: "rgba(192, 238, 242, 1)",
                            color: "black",
                            borderRadius: "50px",
                          }}
                        >
                          {validTypesOfSorting.map((type, index) => {
                            return <MenuItem key={index}>{type}</MenuItem>;
                          })}
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
                  {!isLoading ? (
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
                          <Button
                            sx={{ color: "black" }}
                            onClick={dealingWithOpeningAPdf}
                          >
                            Open
                          </Button>
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
                  ) : (
                    <CircularProgress />
                  )}
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
