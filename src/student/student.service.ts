import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudent = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  }).populate('user');
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ _id: id }).populate('admissionSemester').populate('academicDepartment');
  return result;
};

const updateStudent = async (id: string, data: TStudent) => {
  const result = await Student.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id, { new: true });
  return result;
};

export const studentService = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
