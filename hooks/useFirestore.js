import { db } from "@/firebase/config";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useAuthContext } from "./useAuthContext";
import { useContext } from "react";
import { QuestionsContext } from "@/context/QuestionContext";

export default function useFirestore() {
  const { user } = useAuthContext();
  const { state } = useContext(QuestionsContext);
  async function addForm() {
    try {
      if (!user) {
        return {
          message: "User not found. Log in to continue",
        };
      }
      const docRef = await addDoc(collection(db, "forms"), {
        name: user.displayName,
        email: user.email,
        userId: user.uid,
        form: state,
        createdAt : new Date()
      });
      return {isError : false , id : docRef.id}
    } catch (e) {
      return {isError : true , error : e}
    }
  }

  async function getForm(formId , setFormData) {
    const docRef = doc(db, "forms", formId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormData(docSnap.data())
    } else {
      setFormData({message : "Form not found" , error : true})
    }
  }

  async function getAllUsersForm(setList){
    try {
      const q = query(collection(db , "forms") , where("userId" , "==" , user.uid))
      const docSnap = await getDocs(q)
      let forms = []
      docSnap.forEach(doc => {
         forms.push({id : doc.id , name : doc.data().form.name , desc : doc.data().form.description})
      })
      setList(forms)
    }catch(err){
      setList({err , errorOccured : true})
    }
  }

  async function createSubmission(submission , setSubmitResponse){
    try {
      const docRef = await addDoc(collection(db, "submissions"), submission);
      setSubmitResponse({errorOccured : false , id : docRef.id})
    } catch (error) {
      setSubmitResponse({errorOccured : true , error})
    }
  }

  async function getAllSubmissions(formId , setSubmissions){
    try {
      const q = query(collection(db , "submissions") , where("formId" , "==" , formId))
      const docSnap = await getDocs(q)
      const submissions = []
      docSnap.forEach(doc => {
        submissions.push({id : doc.id , ...doc.data()})
      })
      setSubmissions(submissions)
    }catch(error){
      setSubmissions({errorOccured : true , error})
    }
  }

  async function checkCreatorOfForm(formId , setIsValidUser){
    try {
      const q = query(collection(db , "forms") , where("userId" , "==" , user.uid))
      const docSnap = await getDocs(q)
      let forms = []
      docSnap.forEach(doc => {
         forms.push({id : doc.id , name : doc.data().form.name , desc : doc.data().form.description})
      })

        setIsValidUser({
          valid : forms.filter((form) => form.id === formId ).length > 0,
          ...forms.filter((form) => form.id === formId )[0]
        })
      
    } catch(error){
      setIsValidUser({valid : false})
    }
  }

  return { addForm , getForm  , getAllUsersForm , createSubmission , getAllSubmissions , checkCreatorOfForm};
}
