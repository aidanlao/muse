import {
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    getDoc,
    updateDoc,
    where,
  } from "firebase/firestore";
  import { cache } from 'react'
  import { db } from './config'
  export const getItem = cache(async (id: string) => {
    const docRef = doc(db, "post", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  })

  export const getComposer = cache(async (id: string) => {
    const docRef = doc(db, "composer", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  })