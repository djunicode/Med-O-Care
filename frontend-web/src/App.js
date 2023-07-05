import "./Styles/App.css"
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from './Layouts/RootLayout';
import HomePage from "./Pages/HomePage"
import SignupPage from "./Pages/SignupPage"
import LoginPage from "./Pages/LoginPage"
import ForgotPasswordPage from "./Pages/ForgotPasswordPage"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="forgotpassword" element={<ForgotPasswordPage />} />
    </Route>
  )
)


function App() {
  return <RouterProvider router={router} />
}

export default App;
