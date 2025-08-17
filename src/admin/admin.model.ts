import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema=new Schema<TAdmin>({
    name:{Types:String},
    fatherName:{Types:String},
    motherName:{Types:String}
})

export const Admin=model<TAdmin>('Ammin',adminSchema)