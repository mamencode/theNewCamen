import{useState, useEffect} from 'react'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebaseConfig";
export default function useCustomFeed(following) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [feeds, setFeeds] = useState([])

  useEffect(()=> {
      setLoading(true)
    setError(false)
if(following.length > 0){
   const foEmail = following.map((item) => item.data.email);
   const feedRef = collection(db, "feeds");

   const q = query(feedRef, where("email", "in", foEmail))
onSnapshot(q, (snap)=> {
setFeeds( prevFeeds => {
  return [...new Set([...prevFeeds, ...snap.docs.map(doc => {
    return {
      id: doc.id,
      data: doc.data()
    }
  })])]
}
 
)
})
}
  }, [following])
  return {feeds, error, loading}
}
