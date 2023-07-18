import React from 'react';
import reminder from '../Assets/reminder.svg';
import { ArrowBack } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import './History.css';


export const History = () => {
  const sortingOptions = [
    "All documents",
    "Frequently visited",
    "Latest to oldest",
    "Oldest to latest",
    "Medical files",
    "Insurance files",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [typeOfSorting, setTypeOfSorting] = useState("");
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [fileViewCount, setFileViewCount] = useState([]);
  const [all, setAll] = useState('');

  const validTypes = (type) => sortingOptions.includes(type);

  const getData = async (countDataFound) => {
    const options = {
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/getFiles`,
      method: "GET",
    };
    const response = await axios.request(options);

    if (response.data.success) {
      const dataArr = response.data.data.files;
      setData([...dataArr]);
      if (!countDataFound) {
        setFileViewCount([...dataArr]);
      }

      return true;
    } else {
      alert("Data nahi aya!");
    }
    return false;
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/user/getFiles`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.data.files);
        setIsLoading(false);
      });
  }, []);

  const performSorting = () => {
    switch (typeOfSorting) {
      case "All documents":
        setSortedData(data);
        break;

      case "Frequently visited":
        setSortedData([...data].sort((a, b) => b.viewCount - a.viewCount));
        // setSortedData([...fileViewCount].sort((a, b) => b.viewCount - a.viewCount))

        break;

      case "Latest to oldest":
        setSortedData(
          [...data].sort(
            (a, b) => new Date(b.dateOfUpload) - new Date(a.dateOfUpload)
          )
        );
        break;

      case "Oldest to latest":
        setSortedData(
          [...data].sort(
            (a, b) => new Date(a.dateOfUpload) - new Date(b.dateOfUpload)
          )
        );
        break;

      case "Medical files":
        setSortedData(data.filter((file) => file.type === "medical"));
        break;

      case "Insurance files":
        setSortedData(data.filter((file) => file.type === "insurance"));
        break;

      default:
        break;
    }
  };

  const previousSortOption = () => {
    const previousType = localStorage.getItem("typeOfDisplay");
    if (previousType && validTypes(previousType)) {
      setTypeOfSorting(previousType);
    } else {
      setTypeOfSorting("All documents");
    }
  };

  const loadFileViewCount = () => {
    const previousCount = localStorage.getItem("fileViewCount");
    if (previousCount?.length !== 0) {
      const previousCountArr = JSON.parse(previousCount);
      setFileViewCount([...previousCountArr]);

      return true;
    }
    return false;
  };

  const addNewCountData = () => {
    const newFiles = [];
    for (const file of data) {
      const findFile = data.find(
        (obj) => obj.fileSecure_url === file.fileSecure_url
      );

      if (!findFile) {
        newFiles.push(file);
      }
    }
    const finalData = [...fileViewCount, ...newFiles];
    setFileViewCount(finalData);
    // localStorage.setItem("fileViewCount", JSON.stringify(finalData));
  };

  const initializeData = async () => {
    try {
      setIsLoading(true);
      const countDataFound = loadFileViewCount();
      previousSortOption();
      const response = await getData(countDataFound);
      if (response) {
        setIsLoading(false);
      }
    } catch (err) {
      // Handle error
    }
  };

  // useEffect(() => {
  //     initializeData();
  // }, []);

  useEffect(() => {
    performSorting();
  }, [typeOfSorting]);

  useEffect(() => {
    // addNewCountData();
    performSorting();
  }, [isLoading]);

  const handleSorting = (event) => {
    setTypeOfSorting(event.target.value);
    localStorage.setItem("typeOfDisplay", event.target.value);
  };

  const navigate = useNavigate();

  const updateCount = (url) => {
    const findFile = data.find((file) => file.fileSecure_url === url);
    if (findFile) {
      findFile.viewCount++;
    }
    const updatedFile = { ...findFile };

    const filterOtherFiles = data.filter((file) => file.fileSecure_url !== url);
    const finalData = [updatedFile, ...filterOtherFiles];

    setFileViewCount(finalData);
    localStorage.setItem("fileViewCount", JSON.stringify(finalData));
  };

  const deleteCount = (token) => {
    const filterOtherFiles = data.filter((file) => file.delete_token !== token);

    setFileViewCount(filterOtherFiles);
    localStorage.setItem("fileViewCount", JSON.stringify(filterOtherFiles));
  };

  const handleViewFile = (url) => {
    updateCount(url);
    // navigate(`view`);
  };

  const handleDeleteFile = async (delete_token) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/user/deleteFile/${delete_token}`,
        {
          delete_token,
        }
      );

      if (response.success) {
        deleteCount(delete_token);
        getData(true);
      } else {
        throw new Error("oops");
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while deleting the file. Please try again later."
      );
    }
  };

  return (
    <div>
      <table id="main-table">
        <tr>
          <td>
            <div>
              <Box id="arrow-box" >
                <ArrowBack sx={{
                  color: 'rgba(13, 13, 13, 0.75)',
                  paddingTop: '0px'
                }}> </ArrowBack>
              </Box>
              <Box id="rem-pic">
                <img id="rem-pc-img" src={reminder} alt="reminder" />
              </Box>
            </div>
          </td>
          <td>
            <div>
              <table class='grid'>
                <tr>
                  <td>
                    <div class='one'>
                      <p id="history-b" style={{
                        color: 'rgba(83, 127, 231, 1)',
                        textAlign: "left",
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        fontSize: "18",
                      }}>History</p>
                    </div>
                  </td>
                  <td>
                    <div class='two'>
                      <FormControl
                        id="form-control"
                        size="small">
                        <InputLabel id='demo-select-small-label' >All</InputLabel>
                        <Select labelId='demo-select-small-label'
                          id='demo-select-small'
                          value={all}
                          label='All'
                          // onChange={handleChange}
                          sx={{
                            width: '169px',
                            height: '29px',
                            backgroundColor: 'rgba(192, 238, 242, 1)',
                            color: 'black',
                            borderRadius: '50px'
                          }}
                        >
                          <MenuItem id='prescrition'>Prescription</MenuItem>
                          <MenuItem id='insurance'>Insurance</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </td>
                </tr>
              </table>
              <div id="fetch-table">
                <table id='content'>
                  <tr>
                    <td>
                      <div id="tab-data">
                        <span id="doc-presc" style={{
                          color: 'rgba(0, 0, 0, 1)',
                          textAlign: "left",
                          fontFamily: "Poppins",
                          fontWeight: "medium",
                          fontSize: "16"
                        }}>Doctor's presc</span>
                        <br></br>
                        <span id="presc-info" style={{
                          color: 'rgba(0, 0, 0, 0.55)',
                          textAlign: "left",
                          fontFamily: "Poppins",
                          fontWeight: "medium",
                          fontSize: "13"
                        }}>Prescription</span>
                      </div>
                    </td>
                    <td>
                      <div id="buttons-open-edit">
                        <Button sx={{ color: 'black' }}>Open</Button>
                        <Button variant='contained' sx={{
                          color: 'white',
                          borderRadius: '50px',
                          backgroundColor: 'rgba(83, 127, 231, 1)'
                        }}>Edit</Button>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div >
  )
}

export default History;