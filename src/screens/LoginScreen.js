import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { saveUser } from "../redux/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const provider = new GoogleAuthProvider();

export default function LoginScreen() {
  const user = useSelector((state) => state.auth.value);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        //console.log(user);

        dispatch(
          saveUser({
            uid: user.uid,
            userName: user.displayName,
            email: user.email,
            profilePic: user.photoURL,
            lastSeen: user.metadata.lastSignInTime
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        const email = error.email;

        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div
      className="absolute w-3/5 bg-white"
      style={{ transform: "translate(-50%, -50%)", top: "50%", left: "50%" }}
    >
      <div className=" flex justify-center -mt-10">
        <img
          src="https://i.imgur.com/UFpDWQn.png"
          alt=""
          className="border-2 w-12 h-12 rounded-full object-contain "
        />
      </div>

      <div className="px-12 py-10">
        <div className=" mb-2">
          <div className="flex justify-center">
            <button
              onClick={signin}
              className="text-white h-12 rounded px-6 font-bold"
              style={{ backgroundColor: "#54b72b" }}
            >
              Sign In with Google{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
