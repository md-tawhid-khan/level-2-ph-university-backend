import  jwt,{JwtPayload } from 'jsonwebtoken';
import appError from '../errors/appErrors';
import status from 'http-status';
const verifyToken=(token:string,secret:string)=>{
 
    try {
   const decoded=  jwt.verify(token,secret) as JwtPayload
   
   return decoded
    } catch (error) {
    
        throw new appError(status.UNAUTHORIZED, "you are not authorized")
     
    }

}
export default verifyToken