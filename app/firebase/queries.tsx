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

  export const getPiece = cache(async (id: string) => {
    const docRef = doc(db, "pieces", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  })
  export const getComposer = cache(async (id: string) => {
    const docRef = doc(db, "composer", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  })

  export const getAllComposers = cache(async () => {
    const colRef = collection(db, "composer");
    const collectionSnap = await getDocs(colRef);
    return collectionSnap.docs;
  })

  export const getAllPiecesBy = cache(async (composer :string ) => {
    const colRef = collection(db,"pieces");
    const q = query(colRef, where("composerid", "==", composer));
    const colSnap = await getDocs(q);

    return colSnap.docs;
  })

  export const getAllPieces = cache(async ()=> {
    const colRef = collection(db,"pieces");
    const colSnap = await getDocs(colRef);

    return colSnap.docs;
  })
  export const getPopularPiecesBy = cache(async (composer :string ) => {
    const colRef = collection(db,"pieces");
    const q = query(colRef, where("composerid", "==", composer), where("popular", "==", true));
    const colSnap = await getDocs(q);

    return colSnap.docs;
  })