import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { db } from "../../src/firebase/config";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function useFetchCollection (collectionName) {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    const getCollection = () => {
        setIsLoading(true)
        try {
          const docRef = collection(db, collectionName)
          const q = query(docRef, orderBy("createdAt", "desc"))
          onSnapshot(q, (snapshot) => {
            const allData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
              }))

            setData(allData)
            setIsLoading(false)
             
          })
        } catch(error) {
          setIsLoading(false)
          toast.error(error.message)
        }
    } 

    useEffect(() => {
        getCollection()
    }, [])

    return {data, isLoading}      

}

export default useFetchCollection