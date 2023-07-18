import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function LayoutForViewPage() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
