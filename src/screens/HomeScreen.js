import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LoadingCircular from "./LoadingCircular";
import PostItemScreen from "./PostItemScreen";
import useCustomFeed from "./useCustomFeed"
export default function HomeScreen({ following }) {
  console.log(following);

  const {feeds, error, loading} = useCustomFeed(following)

  console.log(feeds)
  return (
    <div>
      <div className="bg-gray-100 sticky top-0 flex justify-between px-3 pt-2 z-20">
        <img
          src="https://img.icons8.com/ios/35/000000/instagram-new--v1.png"
          className="cursor-pointer "
          alt=""
        />

        <Link to="/messages">
          <img
            src="https://img.icons8.com/material-outlined/35/000000/facebook-messenger--v1.png"
            className=" cursor-pointer "
            alt=""
          />
        </Link>
      </div>
   {feeds.length > 0? (
        <div className="mb-16">
        {feeds.map((post) => (
            <PostItemScreen
              key={post.id}
              id={post.id}
              username={post.data.username}
              email={post.data.email}
              profilePic={post.data.profilePic}
              postPic={post.data.image}
              caption={post.data.caption}
              timestamp={post.data.timestamp}
              uid={post.data.uid}
            />
          ))}
  </div>
   ): <LoadingCircular/>}
    </div>
  );
}
