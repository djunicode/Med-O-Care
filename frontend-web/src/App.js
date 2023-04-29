import "./Styles/App.css";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
import HomePage from "./Pages/Home/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import UploadRecords from "./Pages/UploadRecords";
import Healthscore from "./Pages/Healthscore";
import PeriodTracker from "./Pages/PeriodTracker";
import OTPPage from "./Pages/OTPPage";
import ResetPassword from "./Pages/ResetPassword";
import History from "./Pages/History";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="uploadrecords" element={<UploadRecords />} />
        <Route path="healthscore" element={<Healthscore />} />
        <Route path="periodtracker" element={<PeriodTracker />} />
         <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="otp" element={<OTPPage />} />
            <Route path="reset-password" element={<ResetPassword />} />
        <Route path ="history" element={<History />} />
      </Route>
      
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
