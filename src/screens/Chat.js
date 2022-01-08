import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import Avatar from "@mui/material/Avatar";

import useUserStatus from "../helpers/useUserStatus";
import getRecipientEmail from "../helpers/getRecipientEmail";
export default function Chat({ id, users, timestamp }) {
  const user = useSelector((state) => state.auth.value);
  const navigate = useNavigate();

  const recEmail = getRecipientEmail(users, user);
  const recName = recEmail.split("@")[0];
  const { duser } = useUserStatus(recName);
  const goToChat = () => {
    navigate(`/chat/${id}`);
  };

  console.log(duser);

  return (
    <div
      className="cursor-pointer px-4 flex py-2 my-2 bg-gray-100 hover:bg-blue-200 transition duration-500 items-center"
      onClick={goToChat}
    >
      <img
        className="rounded-full bg-gray-400 h-12 w-12"
        alt=""
        src={duser[0]?.data.profilePic}
      />
      <div className="px-2  justify-center">
        <h1 className="text-black font-bold text-sm text-center ">{recName}</h1>
        <span className="text-gray-400 text-xs ">
          <Moment fromNow>{timestamp?.toDate()}</Moment>
        </span>
      </div>
    </div>
  );
}
