import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser) => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Exist In The World');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password Not Matched');
  }

  // create jwt token

  return {};
};

export const AuthService = {
  loginUser,
};

// check user exists
// const isUserExist = await User.findOne(
//   { id },
//   { id: 1, password: 1, needsPasswordChange: 1 },
// ).lean();

// Matched the password
// const isPasswordMatched = await bcrypt.compare(password, isUserExist?.password);
// if(!isPasswordMatched) {
//   throw new ApiError(httpStatus.UNAUTHORIZED, "Password Not Matched")
// };
