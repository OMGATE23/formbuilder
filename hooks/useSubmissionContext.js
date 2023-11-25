import SubmissionContext from "@/context/SubmissionContext"
import { useContext } from "react"


export const useSubmissionContext = () => {
    const context = useContext(SubmissionContext)
    if(!context){
        throw new Error("useSubmissionContext not inside its Provider component") 
    }

    return context
}