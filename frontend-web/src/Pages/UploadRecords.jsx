import {
    Box,
    Button,
    Grid,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import documentplusimage from "../Assets/documentplusimage.png";
import { FilePondComponent } from "../Components/FilePond/FilePondUploadComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UploadRecords() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [typeOfDocument, setTypeOfDocument] = useState("");
    const [files, setFiles] = useState([]);
    const [publicIdOfFiles, setPublicIdOfFiles] = useState([]);

    useEffect(() => {
        console.log(publicIdOfFiles);
    }, [publicIdOfFiles]);

    const settingPublicIdOfFiles = (cloudinaryObject) => {
        setPublicIdOfFiles([
            ...publicIdOfFiles,
            {
                secure_url: cloudinaryObject.secure_url,
                public_id: cloudinaryObject.public_id,
                signature: cloudinaryObject.signature,
                version: cloudinaryObject.version,
                delete_token: cloudinaryObject.delete_token,
            },
        ]);
    };

    const deletePublicIdOfFiles = (token) => {
        //send request to delete it from backend here if we dont navigate the page on saving files.

        setPublicIdOfFiles(
            publicIdOfFiles.filter((currentFile) => {
                return currentFile.delete_token !== token;
            })
        );
    };

    const gridStyle = { paddingLeft: 10, paddingRight: 10, paddingTop: 0.7 };

    const isDataValid = () => {
        if (title === "" || typeOfDocument === "") {
            return false;
        } else if (publicIdOfFiles.length === 0) {
            return false;
        } else {
            const dataArr = [...publicIdOfFiles];
            dataArr.forEach((file) => {
                file.name = title;

                if (!file.secure_url) {
                    return false;
                }
            });

            setPublicIdOfFiles([...dataArr]);
        }

        return true;
    };

    const dealingWithSave = async (e) => {
        e.preventDefault();

        //in the future split the documents based on if they are insurance/medical and split the data. Now make 2 seperate requests.
        //also use different colors in react select and same color in filepond to map it beautifully :o

        const options = {
            url: `${process.env.REACT_APP_API_ENDPOINT}/user/${
                typeOfDocument === "Medical records"
                    ? "uploadMedical"
                    : "uploadInsurance"
            }`,
            method: "POST",
            data: { files: publicIdOfFiles },
        };

        if (isDataValid()) {
            const response = await axios.request(options);
            console.log(response);

            if (response.data.success) {
                alert(`WOW OMG UPLOADED 😏 `);
                navigate("/history");
            } else {
                alert(`error 🫠`);
            }
        } else {
            alert(`Fill all the fields!`);
        }
    };

    return (
        <>
            <Box margin={"0px auto"} sx={{ width: "50%" }}>
                <Typography
                    sx={{
                        fontWeight: "bolder",
                        marginLeft: "4rem",
                        color: "#537FE7",
                    }}
                >
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
                    <Select
                        id="documentType"
                        placeholder="Type of document"
                        select
                        value={typeOfDocument || ""}
                        onChange={(e) => {
                            setTypeOfDocument(e.target.value);
                        }}
                        sx={{
                            placeholder: "Type of document",
                            borderRadius: 10,
                            color: "region",
                            backgroundColor: "white",
                        }}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Select an option
                        </MenuItem>
                        <MenuItem value="Insurance records">
                            Insurance records
                        </MenuItem>
                        <MenuItem value="Medical records">
                            Medical records
                        </MenuItem>
                    </Select>
                </Grid>

                <Grid sx={gridStyle}>
                    <Box
                        width={"380px"}
                        sx={{
                            marginLeft: "2.4rem",
                            marginTop: "20px",
                        }}
                    >
                        <div className="uploadPageFilePondDiv">
                            <FilePondComponent
                                publicIdOfFileToBeUploaded={publicIdOfFiles}
                                setpublicIdOfFileToBeUploaded={
                                    settingPublicIdOfFiles
                                }
                                deleteLogic={deletePublicIdOfFiles}
                                doYouWantCustomPublicId={true}
                                files={files}
                                setFiles={setFiles}
                                acceptedFileType={["application/pdf"]}
                                allowMultiple={true}
                            />
                        </div>
                    </Box>
                </Grid>

                <Grid sx={gridStyle}>
                    <Box marginTop={"1rem"}>
                        <Button
                            type="submit"
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
                        onClick={() => navigate("/history")}
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

            <img
                src={documentplusimage}
                id="documentfirstimage"
                alt="document"
            ></img>
            <img
                src={documentplusimage}
                id="documentsecondimage"
                alt="document"
            ></img>
        </>
    );
}
