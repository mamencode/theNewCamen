import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import UploadScreen from "./UploadScreen";
import { NavLink } from "react-router-dom";
import "./NavLink.css";
import { useSelector } from "react-redux";
export default function BottomNavigation() {
  const user = useSelector((state) => state.auth.value);
  const navName = user.email.split("@")[0];
  return (
    <div className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow  w-screen p-2  mt-16">
      <div className="flex justify-between ">
        <NavLink
          to="/"
          className={(navData) => (navData.isActive ? "isactive" : "inActive")}
        >
          <HomeIcon style={{ fontSize: 30 }} />
        </NavLink>
        <NavLink
          to="/search"
          className={(navData) => (navData.isActive ? "isactive" : "inActive")}
        >
          <SearchOutlinedIcon style={{ fontSize: 30 }} />
        </NavLink>

        <UploadScreen />
        <NavLink
          to="/fev"
          className={(navData) => (navData.isActive ? "isactive" : "inActive")}
        >
          <FavoriteBorderOutlinedIcon style={{ fontSize: 30 }} />
        </NavLink>
        <NavLink
          to={`/${navName}`}
          className={(navData) => (navData.isActive ? "isactive" : "inActive")}
        >
          <img
            src={user.profilePic}
            alt=""
            className="rounded-full h-8 w-8 flex items-center object-cover
        cursor-pointer
              "
          />
        </NavLink>
      </div>
    </div>
  );
}
