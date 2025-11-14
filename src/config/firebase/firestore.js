import {
  getFirestore, collection, doc, query, where, orderBy, limit,
  getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc,
  serverTimestamp, Timestamp
} from "firebase/firestore";
import { firebaseApp } from "./app";

export const db = getFirestore(firebaseApp);

// Factories de refs
export const colRef = (path) => collection(db, path);
export const docRef = (path, id) => doc(db, path, id);

// Lecturas
export async function getById(path, id) {
  const snap = await getDoc(docRef(path, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function getAll(path, { w = [], sort, take } = {}) {
  const constraints = [];
  w.forEach(([field, op, value]) => constraints.push(where(field, op, value)));
  if (sort) constraints.push(orderBy(sort.field, sort.dir || "asc"));
  if (take) constraints.push(limit(take));

  const q = constraints.length ? query(colRef(path), ...constraints) : colRef(path);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Escrituras
export async function create(path, data) {
  const ref = await addDoc(colRef(path), { ...data, createdAt: serverTimestamp() });
  return ref.id;
}

export async function set(path, id, data, { merge = true } = {}) {
  await setDoc(docRef(path, id), { ...data, updatedAt: serverTimestamp() }, { merge });
  return id;
}

export async function patch(path, id, data) {
  await updateDoc(docRef(path, id), { ...data, updatedAt: serverTimestamp() });
  return id;
}

export async function remove(path, id) {
  await deleteDoc(docRef(path, id));
  return id;
}

export { serverTimestamp, Timestamp };
