import { z } from "zod";

const preRequisiteSchemaValidation=z.object({
    course:z.string().optional(),
    isDelete:z.boolean().optional()
})


const courseSchemaValidation=z.object({
    body:z.object({
        title:z.string(),
        prefix:z.string(),
        code:z.number(),
        credits:z.number(),
        preRequisiteCourse:z.array(preRequisiteSchemaValidation).optional(),
        isDelete:z.boolean().optional()
    })
})


const updatePreRequisiteSchemaValidation=z.object({
    course:z.string().optional(),
    isDelete:z.boolean().optional()
})


const updateCourseSchemaValidation=z.object({
    body:z.object({
        title:z.string().optional(),
        prefix:z.string().optional(),
        code:z.number().optional(),
        credits:z.number().optional(),
        preRequisiteCourse:z.array(updatePreRequisiteSchemaValidation).optional(),
        isDelete:z.boolean().optional()
    })
})



export const courseValidation={
    courseSchemaValidation ,
    updateCourseSchemaValidation
}