import "./Styles/App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./Pages/Home/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import UploadRecords from "./Pages/UploadRecords";
import HealthScore from "./Pages/Healthscore";
import PeriodTracker from "./Pages/PeriodTracker";
import OTPPage from "./Pages/OTPPage";
import ResetPassword from "./Pages/ResetPassword";
import History from "./Pages/History";
import PeriodTracker2 from "./Pages/PeriodTracker2";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { isBefore, add } from "date-fns";
import { setupAuthHeaderForNetworkCalls } from "./Services/SetupAuthHeaders";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useApp } from "./Context/app-context";
import ViewAPage from "./Pages/ViewAPage";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<RootLayout />}>
        <Route path="signup" element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route index element={<HomePage />} />
        <Route path="uploadrecords" element={<UploadRecords />} />
        <Route path="healthscore" element={<HealthScore />} />
        <Route path="periodtracker" element={<PeriodTracker />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="otp" element={<OTPPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="history" element={<History />}>
          <Route path="view:id" element={<ViewAPage />} />
        </Route>
        <Route path="periodtracker2" element={<PeriodTracker2 />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const {
    setUserToken,
    setCurrentUser,
    setExerciseData,
    currentUser,
    exerciseData,
  } = useApp();

  const logUserOut = () => {
    setupAuthHeaderForNetworkCalls(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthorized");
  };

  const checkToken = () => {
    try {
      const token = localStorage.getItem("userToken");

      if (token) {
        const decodedToken = jwtDecode(token);
        const expired = isBefore(
          add(new Date(decodedToken.iat * 1000), {
            days: 7,
          }),
          new Date()
        );
        //! iat token object ka attribute issued at
        //kabh token bana decodedToken.iat * 1000
        //!expiry ka time:
        //          add(new Date(decodedToken.iat * 1000), {
        //     days: 7,
        //   }),

        if (expired) {
          logUserOut();
        } else {
          setupAuthHeaderForNetworkCalls(token);
          setUserToken(token);
          const data = JSON.parse(localStorage.getItem("currentUser"));
          setCurrentUser(data);
        }
      } else if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/signup"
      ) {
        logUserOut();
      }
    } catch (error) {
      console.log(error);
      logUserOut();
    } finally {
      setIsLoading(false);
    }
  };

  const getExerciseData = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/exercise/allExercises`,
      {
        method: "GET",
      }
    );
    if (resp.status === 200) {
      const respInJSON = await resp.json();
      setExerciseData(respInJSON.data);
    }
  };

  const loadInitialData = () => {
    // load general data, no auth needed
    if (exerciseData.length === 0) {
      getExerciseData();
    }

    if (currentUser) {
      // load data of current logged in user
    }
  };

  useEffect(() => {
    checkToken();
    loadInitialData();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          color: "#537fe7",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else {
    return <RouterProvider router={router} />;
  }
}

export default App;
