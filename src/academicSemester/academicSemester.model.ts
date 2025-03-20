import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  Months,
  semesterCode,
  semesterName,
} from './academicSemester.constant';
import appError from '../errors/appErrors';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: semesterName },
  year: { type: String },
  code: { type: String, enum: semesterCode },
  startMonth: {
    type: String,
    enum: Months,
  },
  endMonth: {
    type: String,
    enum: Months,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new appError(404,'academic semester  already existed');
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
export default AcademicSemester;
