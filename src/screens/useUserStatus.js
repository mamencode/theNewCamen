import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebaseConfig";

export default function useUserStatus() {
  const [chats, setChats] = useState([]);
  const [savedP, setSavedP] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (user) {
      console.log(user);
      const userChatRef = query(
        collection(db, "chats"),
        where("users", "array-contains", user.email)
      );
      onSnapshot(userChatRef, (snap) => {
        setChats(
          snap.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        );
      });

      const userFeedsRef = query(
        collection(db, "feeds"),
        where("email", "==", user.email)
      );
      onSnapshot(userFeedsRef, (snap) => {
        const uFeed = [];
        snap.forEach((doc) => {
          uFeed.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setFeeds(uFeed.sort((a, b) => b.data.timestamp - a.data.timestamp));
      });

      const userSavedPostRef = query(
        collection(db, "users", user.uid, "savedposts"),
        orderBy("timestamp", "desc")
      );
      onSnapshot(userSavedPostRef, (snap) => {
        setSavedP(
          snap.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        );
      });
      const userFollowingRef = query(
        collection(db, "users", user.uid, "followingF"),
        orderBy("timestamp", "desc")
      );

      onSnapshot(userFollowingRef, (snap) => {
        setFollowing(
          snap.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        );
      });

      const userFollowRef = query(
        collection(db, "users", user.uid, "followers"),
        orderBy("timestamp", "desc")
      );

      onSnapshot(userFollowRef, (snap) => {
        setFollowers(
          snap.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        );
      });
    }
  }, [user]);

  return { chats, savedP, following, followers, feeds };
}
