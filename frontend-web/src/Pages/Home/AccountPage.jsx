import * as React from "react";
import Paper from "@mui/material/Paper";
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

const style = {
  position: "relative",
  top: "48%",
  left: "86%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const genders = ["Male", "Female", "Other"];

// const AccountPage = ({open, close}) => {

//   const [edit, setEdit] = React.useState(false);

//   const handleEdit = () => {
//       setEdit(true);
//   }

//   return (
//     <div>
//       <Modal
//         open={open}
//       >
//         <Paper sx={style}>
//           <Grid container justifyContent='space-between'>
//             <ArrowBackIosIcon onClick={close}/>
//             <Button sx={{marginRight: 5, color: '#537FE7'}} onClick={handleEdit}>Edit</Button>
//           </Grid>
//           <Grid container spacing={1} justifyContent='space-between' sx={{margin: 'auto'}}>
//             <Grid item xs={3}>
//               <Avatar sx={{width: 65, height: 65}}>A</Avatar>
//             </Grid>
//             <Grid item xs={9}>
//               <Typography variant='h6' sx={{fontWeight: 'bold'}}>xyz</Typography>
//               <Typography variant='body2'>1234567890</Typography>
//               <Typography variant='body2'>abc@gmail.com</Typography>
//             </Grid>
//           </Grid>
//           <Grid container sx={{marginTop: 1, ml: 2}}>
//             <Typography variant='h6' sx={{fontWeight: 'bold'}}>About You</Typography>
//             <Grid item xs={12}>
//               <Typography sx={{ marginLeft: 2, fontSize: 'medium'}}>Gender</Typography>
//                     <TextField select defaultValue='Female' sx={{borderColor: '#537FE7'}}
//                             InputProps={{
//                               readOnly: edit ? false : true,
//                               sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7'},}}>
//                             {genders.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Age</Typography>
//                     <TextField defaultValue='25' sx={{borderColor: '#537FE7'}}
//                             InputProps={{
//                               readOnly: edit ? false : true,
//                               sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7' },}}>
//                     </TextField>
//             </Grid>
//             <Grid item xs={12}>
//                 <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Date of Birth</Typography>
//                   <TextField variant="outlined" type='date' defaultValue="2003-12-23"
//                   InputProps={{
//                     readOnly: edit ? false : true,
//                     sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300,},}} />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography sx={{marginLeft: 2, fontSize: 'medium'}}>Height</Typography>
//                     <TextField defaultValue='5' sx={{borderColor: '#537FE7'}}
//                             InputProps={{
//                               readOnly: edit ? false : true,
//                               sx: { borderRadius: 10, backgroundColor: 'white', height: 40, width: 300, borderColor: '#537FE7' },}}>
//                     </TextField>
//             </Grid>
//           </Grid>
//           <Button sx={{marginLeft: 2, color: '#537FE7', mt: 2}}>Logout</Button>
//         </Paper>
//       </Modal>
//     </div>
//   );
// }

// export default AccountPage;

const AccountPage = ({ open, close }) => {
  const { currentUser } = useApp();

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

  const dealingWithSave = () => {
    console.log(gender);
    console.log(dateOfBirth);
  };

  return (
    <div>
      <SlidingPane isOpen={state.isPaneOpen} hideHeader width="450px">
        <Grid container justifyContent="space-between">
          <Button sx={{ color: "black" }} onClick={close}>
            <ArrowBackIosIcon />
          </Button>
          <Button
            sx={{ marginRight: 5, color: "#537FE7" }}
            size="large"
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Grid>
        <Grid container spacing={1} sx={{ mt: 3, ml: 4 }}>
          <Grid item xs={3}>
            <Avatar sx={{ width: 85, height: 80 }}>
              {/* display pfp img here*/}
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {currentUser?.fName}
            </Typography>
            <Typography variant="h6">{currentUser?.phone}</Typography>
            <Typography variant="h6">{currentUser?.email}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: 3, ml: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", ml: 2 }}>
            About You
          </Typography>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              Gender
            </Typography>
            <TextField
              select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{ borderColor: "#537FE7" }}
              InputProps={{
                readOnly: edit ? false : true,
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
            </TextField>
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography sx={{ marginLeft: 2, fontSize: "large" }}>
              Age
            </Typography>
            <TextField
              value={differenceInYears(new Date(), new Date(dateOfBirth))}
              sx={{ borderColor: "#537FE7" }}
              onChange={(e) => {
                // setDateOfBirth(
                //   format(
                //     addYears(
                //       new Date(dateOfBirth),
                //       e.target.value -
                //         differenceInYears(new Date(), new Date(dateOfBirth))
                //     ),
                //     "yyyy-MM-dd"
                //   )
                // )
                console.log(
                  format(
                    addYears(
                      new Date(dateOfBirth),
                      e.target.value -
                        differenceInYears(new Date(), new Date(dateOfBirth))
                    ),
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
                console.log();
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
            sx={{ marginRight: 10, color: "#537FE7", mt: 2 }}
            size="large"
          >
            Save
          </Button>
        </Grid>
      </SlidingPane>
    </div>
  );
};

export default AccountPage;
