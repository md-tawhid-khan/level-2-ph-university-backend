import { Router } from 'express';
import { userRouters } from '../user/user.router';
import { studentRouters } from '../student/student.router';
import { academicSemesterRouter } from '../academicSemester/academicSemester.router';
import { academicFacultyRouter } from '../academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../academicDepartment/academicDepartment.router';
import { courseRouter } from '../course/course.route';
import { semesterRegistrationRouter } from '../semesterRegistration/semesterRegistration.router';
import { offeredCourseRouter } from '../offferedCourse/offeredCourse.route';
import { facultyRouter } from '../faculty/faculty.router';

const router = Router();

const modulesRouters = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/students',
    route: studentRouters,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
  {
    path:'/academic-faculties',
    route:academicFacultyRouter,
  },
  {
    path:'/academic-department',
    route:academicDepartmentRouter
  },
  {
    path:'/courses',
    route:courseRouter
  },
  {
    path:'/semester-registerations',
    route:semesterRegistrationRouter
  },
  {
    path:'/offered-course',
    route:offeredCourseRouter
  },
  {
    path:'/faculties',
    route:facultyRouter
  },
 
];

modulesRouters.forEach((route) => router.use(route.path, route.route));

export default router;
