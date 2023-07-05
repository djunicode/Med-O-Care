import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar, Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useApp } from "../../Context/app-context";
import { addYears, differenceInYears, format } from "date-fns";
import "./Home.css";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { setupAuthHeaderForNetworkCalls } from "../../Services/SetupAuthHeaders";
import { useNavigate } from "react-router-dom";
import CloudinaryImageTransformations from "../../Components/Cloudinary/CloudinaryImageTransformations";

const AccountPage = ({ open, close }) => {
  const genders = ["Male", "Female", "Other"];
  const { currentUser, setUserToken, setCurrentUser } = useApp();

  const dealingWithAgeKeyDown = (e) => {
    e.preventDefault();
  };

  const [dateOfBirth, setDateOfBirth] = useState(
    format(new Date(currentUser.dob), "yyyy-MM-dd")
  );
  const [gender, setGender] = useState(currentUser.gender);
  const [state, setState] = useState({
    isPaneOpen: true,
  });
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const dealingWithSave = async () => {
    try {
      const options = {
        method: "PUT",
        url: `${process.env.REACT_APP_API_ENDPOINT}/user/editUserInfo`,
        data: { email: currentUser.email, gender, dob: dateOfBirth },
      };

      const resp = await axios.request(options);

      if (resp.data.success) {
        setCurrentUser(resp.data.data);
        close();
      }
    } catch (err) {
      //display toast or alert
      console.error("An error occurred:", err);
    }
  };
  const navigate = useNavigate();

  const logUserOut = () => {
    setupAuthHeaderForNetworkCalls(null);
    setUserToken("");
    localStorage.removeItem("userToken");
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthorized");
  };

  
  return (
    <SlidingPane isOpen={state.isPaneOpen} hideHeader className="sliding-pane" width="400px">
    <div class='account-page-container'>
    <div>
      <Button sx={{ color: "black" }} onClick={close}>
        <ArrowBackIosIcon sx={{float: 'top-left'}}/>
      </Button>
    </div>
    <div>
      <Button
          sx={{ marginRight: 5, color: "#537FE7", float: 'right' }}
          size="large"
          onClick={handleEdit}
        >
          Edit
      </Button>
    </div>
    <div id='account-profile-details'>
      <div id='account-page-avatar'>
        <Avatar sx={{ width: "5.6rem", height: "5.6rem" }}>
          <AdvancedImage
            cldImg={CloudinaryImageTransformations(
              currentUser.pfpPublicID,
              "profilePic",
              100,
              100
            )}
          />
        </Avatar>
      </div>
      <div>
        <div id='profile-user'>
          {currentUser?.fName}
        </div>
        <div>{currentUser?.phone}</div>
        <div>{currentUser?.email}</div>
      </div>
    </div>
    <Grid container sx={{ marginTop: 3, ml: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", ml: 2 }}>
        About You
      </Typography>
      <Grid item xs={12} sx={{ mt: 2 }}>
        <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
          Gender
        </Typography>
        {edit &&
        <TextField
          select  
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          sx={{ borderColor: "#537FE7" }}
          InputProps={{
            sx: {
              borderRadius: 10,
              backgroundColor: "white",
              height: 40,
              width: 300,
              borderColor: "#537FE7",
            },
          }}
        >
          {genders.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>}
        {!edit && 
        <TextField
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        sx={{ borderColor: "#537FE7" }}
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 10,
            backgroundColor: "white",
            height: 40,
            width: 300,
            borderColor: "#537FE7",
          },
        }}
      />}
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Age
                    </Typography>

                    <TextField
                        value={differenceInYears(
                            new Date(),
                            new Date(dateOfBirth)
                        )}
                        sx={{ borderColor: "#537FE7" }}
                        onKeyDown={dealingWithAgeKeyDown}
                        onChange={(e) => {
                            setDateOfBirth(
                                format(
                                    addYears(
                                        new Date(dateOfBirth),
                                        -(
                                            e.target.value -
                                            differenceInYears(
                                                new Date(),
                                                new Date(dateOfBirth)
                                            )
                                        )
                                    ),
                                    "yyyy-MM-dd"
                                )
                            );
                        }}
                        InputProps={{
                            type: "number",
                            readOnly: edit ? false : true,
                            sx: {
                                borderRadius: 10,
                                backgroundColor: "white",
                                height: 40,
                                width: 300,
                                borderColor: "#537FE7",
                            },
                        }}
                    ></TextField>
                </Grid>

                <Grid item xs={12} sx={{ mt: 1 }}>
                    <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
                        Date of Birth
                    </Typography>
                    <TextField
                        variant="outlined"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => {
                            setDateOfBirth(
                                format(
                                    new Date(e.target.value),
                                    "yyyy-MM-dd"
                                )
                            );
                        }}
                        InputProps={{
                            readOnly: edit ? false : true,
                            sx: {
                                borderRadius: 10,
                                backgroundColor: "white",
                                height: 40,
                                width: 300,
                            },
                        }}
                    />
                </Grid>
            </Grid>

            <Grid container justifyContent="space-between">
      <Button sx={{ marginLeft: 2, color: "#537FE7", mt: 2 }} size="large" onClick={() => logUserOut()}>
        Logout
      </Button>
      <Button
        onClick={dealingWithSave}
        sx={{ marginRight: 5, color: "#537FE7", mt: 2, float: 'right' }}
        size="large"
      >
        Save
      </Button>
    </Grid>
</div>
  </SlidingPane>
);
};

export default AccountPage;
