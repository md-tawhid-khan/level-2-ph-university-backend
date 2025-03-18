import { z } from "zod";

export const academicFacultyValidationSchema=z.object({
    name:z.string({
        invalid_type_error:'academic faculty name must be string'
    })
})