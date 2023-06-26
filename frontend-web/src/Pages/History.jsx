import reminder from "../Assets/reminder.svg";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { format } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "dd EEEE, MMMM");
    return formattedDate;
  };
  //TODO ye sabh html ko react me karde aur ek maine jo test vala state banaya hai osko map karde
  //TODO aur responsive bhi karna
  //TODO br ye sabh hata de aur basically acha ui bana de
  return (
    <Grid container>
      <Grid item xs={0} md={2} sx={{ pl: '5%'}}>
        <ArrowBackIcon
          onClick={() => navigate("/uploadrecords")}
          sx={{
            fontSize: "36px",
            color: "rgba(13, 13, 13, 0.75)",
            cursor: "pointer",
          }}
        />
      </Grid>
      <Grid
        item
        xs={0}
        mt="2%"
        md={2}
        sx={{
          transform: "rotate(-12deg)",
        }}
      >
        <img src={reminder} alt="reminder" height="166" width="185" />
      </Grid>
      <Grid item xs={12} md={5}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h6"
            sx={{ color: "#537FE7", fontWeight: "bold", fontFamily: 'Poppins', ml:'1%' }}
        >History</Typography>
          {data[0]?.fileSecure_url && (
            <FormControl
              sx={{
                mb: "1%",
                p: 1,
                minWidth: 120,
              }}
              size="small"
            >
              <InputLabel for="demo-select-small-label">
                Sort / Filter by:
              </InputLabel>
              <Select
                value={typeOfSorting}
                label="Filter"
                onChange={(e) => handleSorting(e)}
                sx={{
                  width: "169px",
                  height: "29px",
                  backgroundColor: "rgba(192, 238, 242, 1)",
                  color: "black",
                  borderRadius: "50px",
                }}
              >
                <MenuItem disabled>Select an option</MenuItem>
                {sortingOptions.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
        <Stack>
          {!data[0]?.fileSecure_url ? (
            <> No data </>
          ) : (
            <>
              {!isLoading ? (
                <>
                  {sortedData.map((fileDetails) => {
                    return (
                      <Card sx={{ borderRadius: "10px", mb: "2%", boxShadow: "1px 1px 3px black" }}>
                        <Grid
                          container
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{ p: '2%'}}
                        >
                          <Grid item md={7} xs={12}>
                            <Typography
                              variant="h6"
                              sx={{ fontFamily: "Poppins" }}
                            >
                              {fileDetails?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {fileDetails?.type}
                            </Typography>
                            <Typography variant="body" color="text.secondary">
                              {formatDate(fileDetails?.dateOfUpload)}
                            </Typography>
                          </Grid>
                          <Grid item md={5} xs={12}>
                            <Button
                              variant="contained"
                              sx={{
                                borderRadius: "20px",
                                mr: "3%",
                                fontWeight: "bold",
                              }}
                              onClick={() => {
                                handleViewFile(
                                    fileDetails.fileSecure_url
                                );
                            }}
                            >
                              View
                            </Button>
                            <Button
                              variant="contained"
                              sx={{
                                borderRadius: "20px",
                                ml: "3%",
                                fontWeight: "bold",
                              }}
                              color="error"
                              onClick={() => {
                                handleDeleteFile(
                                    fileDetails.delete_token
                                );
                            }}
                            >
                              Delete
                            </Button>
                            <Button>
                                <OpenInNewIcon sx={{ fontSize: '32px', color: 'black'}}/>
                            </Button>
                          </Grid>
                        </Grid>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <CircularProgress />
              )}
            </>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default History;
