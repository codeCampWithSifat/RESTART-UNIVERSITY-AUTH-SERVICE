/* eslint-disable no-useless-catch */
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

const createStudent = async (student: IStudent, user: IUser) => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  // set role
  user.role = 'student';
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester,
  ).lean();

  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // generate student id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    // Create student using sesssin and get an array
    const newStudent = await Student.create([student], { session });

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    // set student _id (reference) into user.student
    user.student = newStudent[0]._id;

    //  create new User
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user ---> student  -----> academicSemester and acdemicFaculty and academicDepartment
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }
  return newUserAllData;
};

const createFaculty = async (faculty: IFaculty, user: IUser) => {
  // set default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }
  // set default role
  user.role = 'faculty';

  let newFacultyAllData = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generate faculty id
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    // Create A Faculty With An Array
    const newFaculty = await Faculty.create([faculty], { session });
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Faculty ');
    }
    // set faculty reference in the user
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    newFacultyAllData = newUser[0];

    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newFacultyAllData) {
    newFacultyAllData = await User.findOne({
      id: newFacultyAllData.id,
    }).populate({
      path: 'faculty',
      populate: [{ path: 'academicDepartment' }, { path: 'academicFaculty' }],
    });
  }

  return newFacultyAllData;
};


const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set role
  user.role = 'admin';

  // generate faculty id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ');
    }

    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};
export const UserService = {
  createStudent,
  createFaculty,
  createAdmin
};
