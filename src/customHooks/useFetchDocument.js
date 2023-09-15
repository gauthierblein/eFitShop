import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const useFetchDocument = (collectionName, documentID) => {
    const [document, setDocument] = useState(null)
    const getDocument = async () => {
        const docRef = doc(db, collectionName, documentID)
        const docSnap = await getDoc(docRef);
    
        if (docSnap) {
          const obj = {...docSnap.data(), id: documentID}
          setDocument(obj)
        } else {
          toast.error("Document not found")
        }
      }

      useEffect(() => {
        getDocument()
      }, [])

      return { document }
}

export default useFetchDocument