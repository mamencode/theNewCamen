import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig";
export default function useUserStatus(profile) {
  const [duser, setDuser] = useState([]);

  useEffect(() => {
    if (profile) {
      const gRef = query(
        collection(db, "users"),
        where("uniName", "==", `@${profile}`)
      );

      onSnapshot(gRef, (snap) => {
        setDuser(
          snap.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data()
            };
          })
        );
      });
    }
  }, [profile]);

  return { duser };
}
