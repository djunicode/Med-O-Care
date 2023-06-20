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
import { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

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

    const performSorting = () => {
        switch (typeOfSorting) {
            case "All documents":
                setSortedData(data);
                break;

            case "Frequently visited":
                setSortedData(
                    [...data].sort((a, b) => b.viewCount - a.viewCount)
                );
                // setSortedData([...fileViewCount].sort((a, b) => b.viewCount - a.viewCount))

                break;

            case "Latest to oldest":
                setSortedData(
                    [...data].sort(
                        (a, b) =>
                            new Date(b.dateOfUpload) - new Date(a.dateOfUpload)
                    )
                );
                break;

            case "Oldest to latest":
                setSortedData(
                    [...data].sort(
                        (a, b) =>
                            new Date(a.dateOfUpload) - new Date(b.dateOfUpload)
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

    useEffect(() => {
        initializeData();
    }, []);

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

        const filterOtherFiles = data.filter(
            (file) => file.fileSecure_url !== url
        );
        const finalData = [updatedFile, ...filterOtherFiles];

        setFileViewCount(finalData);
        localStorage.setItem("fileViewCount", JSON.stringify(finalData));
    };

    const deleteCount = (token) => {
        const filterOtherFiles = data.filter(
            (file) => file.delete_token !== token
        );

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

    //TODO ye sabh html ko react me karde aur ek maine jo test vala state banaya hai osko map karde
    //TODO aur responsive bhi karna
    //TODO br ye sabh hata de aur basically acha ui bana de
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
                                <IconButton
                                    onClick={() => navigate("/uploadrecords")}
                                >
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
                                    transform: "rotate(180deg)",
                                }}
                            >
                                <img
                                    src={reminder}
                                    alt="reminder"
                                    height="166"
                                    width="185"
                                />
                            </Box>
                        </div>
                    </td>

                    <td>
                        <div>
                            <table className="grid">
                                <tr>
                                    <td>
                                        <div className="one">
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
                                            <div
                                                className="two"
                                                style={{ paddingLeft: "460px" }}
                                            >
                                                <FormControl
                                                    sx={{
                                                        m: 1,
                                                        p: 1,
                                                        minWidth: 120,
                                                    }}
                                                    size="small"
                                                >
                                                    <InputLabel for="demo-select-small-label">
                                                        Sort / Filter by:
                                                    </InputLabel>
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        name="demo-select-small-label"
                                                        id="demo-select-small"
                                                        value={typeOfSorting}
                                                        label="Filter"
                                                        onChange={(e) =>
                                                            handleSorting(e)
                                                        }
                                                        sx={{
                                                            width: "169px",
                                                            height: "29px",
                                                            backgroundColor:
                                                                "rgba(192, 238, 242, 1)",
                                                            color: "black",
                                                            borderRadius:
                                                                "50px",
                                                        }}
                                                    >
                                                        <MenuItem disabled>
                                                            Select an option
                                                        </MenuItem>
                                                        {sortingOptions.map(
                                                            (type, index) => (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={type}
                                                                >
                                                                    {type}
                                                                </MenuItem>
                                                            )
                                                        )}
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
                                                    {sortedData.map(
                                                        (
                                                            fileDetails,
                                                            index
                                                        ) => {
                                                            console.log(
                                                                fileDetails
                                                            );
                                                            return (
                                                                <tr>
                                                                    <td>
                                                                        <div
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "33px",
                                                                            }}
                                                                        >
                                                                            <span
                                                                                style={{
                                                                                    color: "rgba(0, 0, 0, 1)",
                                                                                    textAlign:
                                                                                        "left",
                                                                                    fontFamily:
                                                                                        "Poppins",
                                                                                    fontWeight:
                                                                                        "medium",
                                                                                    fontSize:
                                                                                        "16",
                                                                                }}
                                                                            >
                                                                                {/* //TODO yaha ek chiz yaad rakhna hi name wrap hona chahiye agar bada hai toh next line me jaise my accounts me kara tha vaise hi kuch */}
                                                                                {
                                                                                    fileDetails?.name
                                                                                }
                                                                            </span>
                                                                            <br></br>
                                                                            <span
                                                                                style={{
                                                                                    color: "rgba(0, 0, 0, 0.55)",
                                                                                    textAlign:
                                                                                        "left",
                                                                                    fontFamily:
                                                                                        "Poppins",
                                                                                    fontWeight:
                                                                                        "medium",
                                                                                    fontSize:
                                                                                        "13",
                                                                                }}
                                                                            >
                                                                                {/* //TODO Yaha date- 12 Monday,June aise format me dikhana... agar jagah nhi mil rha toh ye math dikha chalega  */}
                                                                                {
                                                                                    fileDetails?.dateOfUpload
                                                                                }
                                                                            </span>
                                                                            <span
                                                                                style={{
                                                                                    color: "rgba(0, 0, 0, 0.55)",
                                                                                    textAlign:
                                                                                        "left",
                                                                                    fontFamily:
                                                                                        "Poppins",
                                                                                    fontWeight:
                                                                                        "medium",
                                                                                    fontSize:
                                                                                        "13",
                                                                                }}
                                                                            >
                                                                                {
                                                                                    fileDetails?.type
                                                                                }
                                                                            </span>
                                                                            {/*//TODO yaha external vala icon */}
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div
                                                                            style={{
                                                                                paddingLeft:
                                                                                    "325px",
                                                                            }}
                                                                        >
                                                                            <Button
                                                                                sx={{
                                                                                    color: "black",
                                                                                }}
                                                                                onClick={() => {
                                                                                    handleViewFile(
                                                                                        fileDetails.fileSecure_url
                                                                                    );
                                                                                }}
                                                                            >
                                                                                View
                                                                                in
                                                                                app
                                                                            </Button>
                                                                            <Button
                                                                                variant="contained"
                                                                                sx={{
                                                                                    color: "white",
                                                                                    borderRadius:
                                                                                        "50px",
                                                                                    backgroundColor:
                                                                                        "rgba(83, 127, 231, 1)",
                                                                                }}
                                                                                onClick={() => {
                                                                                    handleDeleteFile(
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
                                                        }
                                                    )}
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
