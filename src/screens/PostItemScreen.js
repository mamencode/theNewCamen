import React, { useState, useEffect, useRef } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  collection,
  where,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
  getDoc
} from "@firebase/firestore";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import Comment from "../components/icons/Comment";
import Share from "../components/icons/Share";
import "./Like.css";
import Moment from "react-moment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartOutlind from "@mui/icons-material/FavoriteBorderOutlined";
import { db } from "../firebaseConfig";

import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function PostItemScreen({
  id,
  username,
  profilePic,
  postPic,
  caption,
  timestamp,
  uid,
  email
}) {
  const [loaded, setLoaded] = useState(false);
  const [comments, setComments] = useState([]);
  const [animationLikes, setAnimationLikes] = useState("initial");
  const [sposts, setsposts] = useState([]);

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [isliked, setisLiked] = useState(false);
  const user = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const capRef = useRef(null);
  const [trunck, setTrunk] = useState(false);
  const [thecap, setCap] = useState("");
  const postDetails = {
    user: username,
    profilePic: profilePic,
    caption: caption,
    timestamp: timestamp
  };
  useEffect(() => {
    const q = query(
      collection(db, "feeds", id, "comments"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setComments(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(() => {
    const q = query(collection(db, "users", user.uid, "savedposts"));

    const unsubscribe = onSnapshot(q, (qSnapshot) => {
      setsposts(
        qSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, [user.uid]);
  useEffect(
    () => setHasSaved(sposts.findIndex((post) => post.data.id === id) !== -1),
    [sposts, id]
  );
  useEffect(() => {
    const q = query(collection(db, "feeds", id, "likes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLikes(
        querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            data: doc.data()
          };
        })
      );
    });
    return () => {
      unsubscribe();
    };
  }, [id]);

  useEffect(
    () => setHasLiked(likes.findIndex((like) => like.id === user.uid) !== -1),
    [likes, user.uid]
  );
  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "feeds", id, "likes", user.uid));
    } else {
      setTimeout(() => setAnimationLikes("goUp"), 0);
      setTimeout(() => setAnimationLikes("waitDown"), 100);
      setTimeout(() => setAnimationLikes("initial"), 200);

      await setDoc(doc(db, "feeds", id, "likes", user.uid), {
        username: user.userName
      });
    }
  };

  const savePost = async () => {
    if (hasSaved) {
      await deleteDoc(doc(db, "users", user.uid, "savedposts", id));
    } else {
      await setDoc(doc(db, "users", user.uid, "savedposts", id), {
        id: id,
        username: username,
        profilePic: profilePic,
        postPic: postPic,
        caption: caption,
        timestamp: timestamp,
        uid: uid
      });
    }
  };
  const likeDouble = async () => {
    if (hasLiked) return;
    else {
      await setDoc(doc(db, "feeds", id, "likes", user.uid), {
        username: user.userName
      });
    }
  };
  const handleLikedDouble = () => {
    setisLiked(true);
    setTimeout(() => {
      setisLiked(false);
    }, 1200);
    likeDouble();
  };

  const gotoComments = () => {
    navigate(`/post/${id}`, { state: postDetails });
  };

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num);
  }
  useEffect(() => {
    if (caption) {
      const word = truncateString(caption, 36);

      setCap(word);
      if (caption > word) {
        setTrunk(true);
      }
    }
  }, [caption]);

  const handleExpand = () => {
    capRef.current.style.display = "block";
    setCap(caption);
    setTrunk(false);
  };

  function goToProfile (){
    const navName = email.split("@")[0];
     navigate(`/${navName}`);
  }
  return (
    <div>
      {loaded ? null : <LoadingSpinner />}
      <div className="mb-2">
        <div className="flex justify-between items-center   mx-2 pt-2 pb-3 ">
          <div className="flex items-center my-1">
            <img
              className="rounded-full h-8 w-8 flex items-center object-cover
              cursor-pointer
            
            "
              src={profilePic}
              alt=""
              onClick={goToProfile}
            />
            <div className="cursor-pointer"     onClick={goToProfile}>
              <p className="text-black   font-sans font-bold text-xs ml-1 ">
                {username}
              </p>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="relative ">
          <img
            className="w-screen z-10"
            alt=""
            style={
              loaded
                ? { maxHeight: "65vh", cursor: "pointer" }
                : { display: "none" }
            }
            src={postPic}
            onLoad={() => setLoaded(true)}
            onDoubleClick={handleLikedDouble}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FavoriteIcon className={isliked ? "icon like" : "icon"} />
          </div>
        </div>
        <div className="flex justify-between items-center   px-2 pt-2 pb-3 bg-white">
          <div className="flex items-center justify-between ">
            {hasLiked ? (
              <FavoriteIcon
                style={{ transition: "color 2s" }}
                onClick={likePost}
                className="btn text-red-500 cursor-pointer mx-2"
              />
            ) : (
              <HeartOutlind
                style={{ transition: "color 2s" }}
                className="cursor-pointer mx-2"
                onClick={likePost}
              />
            )}
            <div onClick={gotoComments}>
              <Comment />
            </div>
            <Share />
          </div>

          {hasSaved ? (
            <BookmarkIcon onClick={savePost} />
          ) : (
            <BookmarkBorderOutlinedIcon onClick={savePost} />
          )}
        </div>
        <div className="px-2 bg-white">
          {likes.length === 1 ? (
            <p
              className="text-black
              text-sm
              font-sans
              font-bold"
            >
              1 Like
            </p>
          ) : likes.length > 1 ? (
            <span className={animationLikes}>{likes.length} likes</span>
          ) : (
            ""
          )}
          <div className="flex py-1 items-center" ref={capRef}>
            <p className="text-black   font-sans font-bold text-xs ml-1">
              {" "}
              {username}
            </p>

            <div className="flex  items-center justify-center">
              <p
                className="pl-1 text-sm text-black  
"
              >
                {thecap}
              </p>
              {trunck ? (
                <span
                  onClick={handleExpand}
                  className=" px-1
text-sm text-gray-300  cursor-pointer
"
                >
                  ...more
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            {comments.length > 0 ? (
              <span
                className="text-gray-400 text-xs cursor-pointer"
                onClick={gotoComments}
              >
                View all {comments.length} comments
              </span>
            ) : (
              ""
            )}
          </div>
          <span className="text-gray-400 text-xs px-2 py-2">
            <Moment fromNow>{timestamp?.toDate()}</Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
