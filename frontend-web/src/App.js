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
import OTPPage from "./Pages/OTPPage"

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
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/otp" element={<OTPPage />} />
      </Route>
      
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
