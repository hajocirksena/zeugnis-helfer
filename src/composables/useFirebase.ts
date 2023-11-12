import { collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import db from "../main";
import { getAuth } from "firebase/auth";

const useFirebase = () => {
  const auth = getAuth();
  const sendToFirebase = async (name: string, content: string) => {
    const userCollection = collection(db, "User");
    const userDocRef = doc(userCollection, auth.currentUser.uid);
    const subCollectionRef = collection(userDocRef, "Results");

    const dataObject = {
      id: auth.currentUser.uid,
      eMail: auth.currentUser.email,
    };

    const subCollectionData = {
      name: name,
      content: content,
    };

    try {
      await setDoc(userDocRef, dataObject, { merge: true });
      await addDoc(subCollectionRef, subCollectionData);
    } catch (error) {
      console.error("Error adding or updating document: ", error);
    }
  };

  const getFromFirebase = async () => {
    if (auth.currentUser) {
      const userCollection = collection(db, "User");
      const userDocRef = doc(userCollection, auth.currentUser.uid);
      const subCollectionRef = collection(userDocRef, "Results");

      try {
        const subCollectionQuerySnapshot = await getDocs(subCollectionRef);
        const subCollectionData = [];

        subCollectionQuerySnapshot.forEach((doc) => {
          subCollectionData.push(doc.data());
        });

        return subCollectionData;
      } catch (error) {
        console.error("Error getting subcollection data: ", error);
        return [];
      }
    } else {
      console.error("User is not authenticated");
    }
  };

  return {
    sendToFirebase,
    getFromFirebase,
  };
};

export default useFirebase;
