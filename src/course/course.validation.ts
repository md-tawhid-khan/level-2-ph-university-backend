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

const updateCourseSchemaValidation=courseSchemaValidation.partial()

export const courseValidation={
    courseSchemaValidation ,
    updateCourseSchemaValidation
}