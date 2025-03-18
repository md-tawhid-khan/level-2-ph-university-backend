import { z } from 'zod';
import {
  Months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';

const createAcademicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...semesterName] as [string, ...string[]]),
    code: z.enum([...semesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidation=z.object({
  body:z.object({
    name:z.enum([...semesterName] as [string, ...string[]]).optional(),
    code:z.enum([...semesterCode] as [string, ...string[]]).optional(),
    year:z.string().optional(),
    startMonth:z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth:z.enum([...Months] as [string, ...string[]]).optional()
  })
})

export const academicSemesterValidation = {
  createAcademicSemesterValidation,
  updateAcademicSemesterValidation
};
