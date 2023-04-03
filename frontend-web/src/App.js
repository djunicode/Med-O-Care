import "./Styles/App.css"
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './Layouts/RootLayout';
import HomePage from "./Pages/Home/HomePage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import ForgotPasswordPage from "./Pages/ForgotPasswordPage"
import Upload from "./Pages/Upload";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="upload" element={<Upload />} />
      <Route path="forgotpassword" element={<ForgotPasswordPage />} />
    </Route>
  )
)


function App() {
  return <RouterProvider router={router} />
}

export default App;
