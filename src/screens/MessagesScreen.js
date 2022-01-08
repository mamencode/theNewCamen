import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Chat from "./Chat";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

import CreateIcon from "../components/icons/CreateIcon";

export default function MessagesScreen({chats}) {
  const navigate = useNavigate();

  const goback = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="bg-gray-100 sticky top-0 items-center px-3 pt-2 mx-auto flex justify-between">
        <IconButton onClick={goback}>
          <ArrowBackIosIcon />
        </IconButton>
        <h1 className="text-black font-bold text-base text-center"> Chats </h1>

        <IconButton
          onClick={() => {
            navigate("/messages/new");
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
      <>
        {chats?.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data.users} />
        ))}
      </>
    </div>
  );
}
