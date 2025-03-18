import {
  TAcademicSemesterNameCodeMapper,
  TMonths,
  TSemesterCode,
  TSemesterName,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const semesterName: TSemesterName[] = ['autumn', 'fall', 'summer'];

export const semesterCode: TSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  autumn: '01',
  fall: '02',
  summer: '03',
};
