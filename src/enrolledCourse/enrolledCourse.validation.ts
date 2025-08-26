import { z } from "zod";

const createEnrolledCourseValidationZodSchema=z.object({
    body:z.object({
        offeredCourse:z.string()
    })
})

const updateEnrolledCourseValidationZodSchema=z.object({
    body:z.object({
        semesterRegistration:z.string(),
        offeredCourse:z.string(),
        student:z.string(),
        courseMarks:z.object({
            classTest1:z.number(),
            midTerm:z.number(),
            classTest2:z.number(),
            finalTest:z.number(),
        })
    })
})

export const enrolledCourseValidation={
    createEnrolledCourseValidationZodSchema,
    updateEnrolledCourseValidationZodSchema
}