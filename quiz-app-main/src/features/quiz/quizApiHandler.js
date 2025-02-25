import { GETQUESTION } from "../../utils/api";
import axios from "../../utils/axios"


export const getQuestion=async(QuestionNumber)=>{
    const res=await axios.get(GETQUESTION+QuestionNumber)
    console.log("res ",res)
    return res;
}