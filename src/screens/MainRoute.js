import React, { useState, useEffect, useCallback } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Outlet,
  useParams
} from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import "./NavLink.css";
import HomeScreen from "./HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import BottomNavigation from "./BottomNavigation";
import ProtectedRoutes from "./ProtectedRoutes";
import { db } from "../firebaseConfig";
import useUserStatus from "./useUserStatus";
import SearchScreen from "./SearchScreen";
import FevScreen from "./FevScreen";
import UserProfileScreen from "./UserProfileScreen";
import LoginScreen from "./LoginScreen";
import MessagesScreen from "./MessagesScreen"
export default function MainRoute() {
  const { feeds, chats, savedP, following } = useUserStatus();
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          profilePic: user.profilePic,
          userName: user.userName,
          uniName: `@${user?.email.split("@")[0]}`,
          uid: user.uid
        },
        { merge: true }
      );
    }
  }, [user]);

  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <>
                <HomeScreen following={following} />
                <BottomNavigation />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <SearchScreen />
                <BottomNavigation />
              </>
            }
          />
          <Route
            path="/fev"
            element={
              <>
                <FevScreen />
                <BottomNavigation />
              </>
            }
          />
          <Route path="/messages" 
          element={<MessagesScreen chats={chats} />} />
          <Route
            path="/:profile"
            element={
              <>
                <UserProfileScreen />
                <BottomNavigation />
              </>
            }
          />
        </Route>
        <Route path="/signin" element={<LoginScreen />} />
      </Routes>
    </div>
  );
}
