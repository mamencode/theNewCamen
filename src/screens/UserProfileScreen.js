import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Route, Routes, useParams } from "react-router-dom";

export default function UserProfileScreen() {
  const { profile } = useParams();
  const user = useSelector((state) => state.auth.value);
  const nA = user.email.split("@")[0];
  return (
    <div>
      {nA === profile ? (
        <div>auth user profile</div>
      ) : (
        <div> gust user profile</div>
      )}
    </div>
  );
}
