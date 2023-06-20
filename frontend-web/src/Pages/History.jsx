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
  const [sortedData, setSortedData] = useState([]);

  const dealingWithDeleteAFile = async (delete_token) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_ENDPOINT}/user/deleteFile/${delete_token}`,
        {
          delete_token,
        }
      );
      // File deleted successfully, update the data
      if (response.success) {
        getData();
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

  //!ye thoda sa gadbad vala h but thike isko rehne de mai dekhta hu
  const performSorting = () => {
    console.log("the data is being sorted");
    if (typeOfSorting === "Frequently visited") {
      setSortedData([...data].sort((a, b) => b.viewCount - a.viewCount));
    } else if (typeOfSorting === "Latest uploaded") {
      setSortedData(
        [...data].sort(
          (a, b) => new Date(b.dateOfUpload) - new Date(a.dateOfUpload)
        )
      );
    } else if (typeOfSorting === "Medical Files") {
      setSortedData([...data].filter((file) => file.type === "medical"));
    } else if (typeOfSorting === "Insurance Files") {
      setSortedData([...data].filter((file) => file.type === "insurance"));
    } else {
      setSortedData(data); // No additional sorting or filtering needed
    }
  };

  const dealingWithSorting = () => {
    const previousType = localStorage.getItem("typeOfDisplay");
    if (previousType && validTypes(previousType)) {
      setTypeOfSorting(previousType);
    } else {
      setTypeOfSorting("Frequently visited");
    }
  };

  //checking if the type i
  const validTypes = (previousType) => {
    return validTypesOfSorting.includes(previousType);
  };

  const [typeOfSorting, setTypeOfSorting] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        dealingWithSorting();
        await getData();
        performSorting();
      } catch (err) {
        // Handle error
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  useEffect(() => {
    performSorting();
    localStorage.setItem("typeOfDisplay", typeOfSorting);
  }, [typeOfSorting]);

  const navigate = useNavigate();

  useEffect(() => {
    if (renderCount.current !== 0 || renderCount.current !== 1) {
      console.log(sortedData);
    }
  }, [sortedData]);

  const getData = async () => {
    const options = {
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/getFiles`,
      method: "GET",
    };
    const response = await axios.request(options);
    if (response.data.success) {
      setData(response.data.data.files);
    } else {
      alert("OH NOOOO 🫢");
    }
  };

  const navigateToUploadRecords = () => {
    navigate("/uploadrecords");
  };

  const dealingWithOpeningAPdf = (file) => {
    const encodedFileName = encodeURIComponent(file.name);
    navigate(`view/${encodedFileName}`, {
      state: { fileData: file, fromHistoryPage: true },
    });
  };

  //TODO ye sabh html ko react me karde aur ek maine jo test vala state banaya hai osko map karde
  //TODO aur responive bhi karna
  //TODO br ye sabh hata de aur basically acha ui bana de phir mai karta baaki ka
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

                  {data[0]?.fileSecure_url && (
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
                            <MenuItem value="" disabled>
                              Select an option
                            </MenuItem>
                            {validTypesOfSorting.map((type, index) => {
                              return <MenuItem key={index}>{type}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </td>
                  )}
                </tr>
              </table>

              {
                //TODO yaha kuch acha ui bana de to display ki ab tak kuch upload nahi kiya hai
                !data[0]?.fileSecure_url ? (
                  <> No data </>
                ) : (
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
                        <>
                          {data.map((fileDetails, index) => {
                            console.log(fileDetails);
                            return (
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
                                      {/* //TODO yaha ek chiz yaad rakhna hi name wrap hona chahiye agar bada hai toh next line me jaise my accounts me kara tha vaise hi kuch */}
                                      {fileDetails?.name}
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
                                      {/* //TODO Yaha date- 12 Monday,June aise format me dikhana... agar jagah nhi mil rha toh ye math dikha chalega  */}
                                      {fileDetails?.dateOfUpload}
                                    </span>
                                    <span
                                      style={{
                                        color: "rgba(0, 0, 0, 0.55)",
                                        textAlign: "left",
                                        fontFamily: "Poppins",
                                        fontWeight: "medium",
                                        fontSize: "13",
                                      }}
                                    >
                                      {fileDetails?.type}
                                    </span>
                                    {/*//TODO yaha extenal vala icon */}
                                  </div>
                                </td>

                                <td>
                                  <div style={{ paddingLeft: "325px" }}>
                                    <Button
                                      sx={{ color: "black" }}
                                      onClick={() => {
                                        dealingWithOpeningAPdf(fileDetails);
                                      }}
                                    >
                                      View in app
                                    </Button>
                                    <Button
                                      variant="contained"
                                      sx={{
                                        color: "white",
                                        borderRadius: "50px",
                                        backgroundColor:
                                          "rgba(83, 127, 231, 1)",
                                      }}
                                      onClick={() => {
                                        dealingWithDeleteAFile(
                                          fileDetails.delete_token
                                        );
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <CircularProgress />
                      )}
                    </table>
                  </div>
                )
              }
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default History;
