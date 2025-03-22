import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleCastError=(error:mongoose.Error.CastError):TGenericErrorResponse=>{
    const errorSources:TErrorSources=[{
        path:error.path ,
        message:error.message
    }    ]

    const message="invalid id";
    const statusCode=400;
    return {
        statusCode,
        message,
        errorSources
    }
}

export default handleCastError