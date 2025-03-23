import { TErrorSources, TGenericErrorResponse } from "../interface/error"

const handleDuplicateError=(error:any):TGenericErrorResponse=>{
    
    const match=error.message.match(/"([^"]*)"/)
    const extractedValue=match && match[1]

    const errorSources:TErrorSources=[{
        path:'',
        message:` ${extractedValue} is already exists`,
    }]

    const statusCode=400 ;
    return {
        statusCode,
        message:"Invalid Id",
        errorSources
    }
}
export default handleDuplicateError