import { TLoginUser } from "./auth.interface";

const loginUser=async(paylod:TLoginUser)=>{
    console.log(paylod)
    return {}
}

export const authServices={
    loginUser
}