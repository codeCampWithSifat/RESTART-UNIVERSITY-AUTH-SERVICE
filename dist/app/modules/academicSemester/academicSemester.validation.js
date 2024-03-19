'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require('zod');
const academicSemester_constant_1 = require('./academicSemester.constant');
const createAcademicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    title: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterTitles],
      {
        required_error: 'Title is Required',
      },
    ),
    year: zod_1.z.string({ required_error: 'Year is Required' }),
    code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCodes], {
      required_error: 'Code is Required',
    }),
    startMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterMonth],
      {
        required_error: 'Start Month is Required',
      },
    ),
    endMonth: zod_1.z.enum(
      [...academicSemester_constant_1.academicSemesterMonth],
      {
        required_error: 'End Month is Required',
      },
    ),
  }),
});
const updateAcademicSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      title: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterTitles], {
          required_error: 'Title is required',
        })
        .optional(),
      year: zod_1.z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterCodes])
        .optional(),
      startMonth: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterMonth], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: zod_1.z
        .enum([...academicSemester_constant_1.academicSemesterMonth], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    },
  );
exports.AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
