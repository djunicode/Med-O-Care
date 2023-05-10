import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import Modal from '@mui/material/Modal';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar, Grid, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { useApp } from "../../Context/app-context";
import { addYears, format } from "date-fns";
import { differenceInYears } from "date-fns";
import { useEffect } from "react";
import './Home.css';
import axios from "axios";


const genders = ["Male", "Female", "Other"];

const AccountPage = ({ open, close }) => {
  const { currentUser } = useApp();

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
  const [edit, setEdit] = React.useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const dealingWithSave = async () => {
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_API_ENDPOINT}/user/editUserInfo`,
      body: {
        gender,
        DOB: dateOfBirth,
        ...currentUser,
      },
    };

    const resp = await axios.request(options);
    //display toast or alert
    if (resp.data.success){
      close();
    } 
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
            <Avatar sx={{ width: 85, height: 80, float: 'left' }}>
              {/* display pfp img here*/}
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
              value={differenceInYears(new Date(), new Date(dateOfBirth))}
              sx={{ borderColor: "#537FE7" }}
              onKeyDown={dealingWithAgeKeyDown}
              onChange={(e) => {
                setDateOfBirth(
                  format(
                    addYears(
                      new Date(dateOfBirth),
                      -(
                        e.target.value -
                        differenceInYears(new Date(), new Date(dateOfBirth))
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
                setDateOfBirth(format(new Date(e.target.value), "yyyy-MM-dd"));
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

          {/* <Grid item xs={12} sx={{mt: 1}}>
              <Typography sx={{marginLeft: 2, fontSize: 'large'}}>Height</Typography>
                    <TextField defaultValue='5' sx={{borderColor: '#537FE7'}}
                            InputProps={{
                              readOnly: edit ? false : true,
                              sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7' },}}>
                    </TextField>
            </Grid> */}
        </Grid>

        <Grid container justifyContent="space-between">
          <Button sx={{ marginLeft: 2, color: "#537FE7", mt: 2 }} size="large">
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