import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const getFirebaseConfig = () => {
  return JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
};

const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function add(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

async function retrieveAll(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function edit(collectionName, data) {
  const { id } = data;
  const docRef = await setDoc(collection(db, collectionName, id), data);
  return docRef.id;
}

async function remove(collectionName, docId) {
  const docToDelete = doc(db, collectionName, docId);

  try {
    await deleteDoc(docToDelete);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

export { add, retrieveAll, remove, edit };
