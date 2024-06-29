import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { paginationFields } from '../../../constants/pagination';
import { TAdminOverview } from '../../../interfaces/common';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterAbleFields } from './user.constant';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const UserData = req.body;

    const result = await UserService.createUser(UserData);
    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created successfully!',
      data: result,
    });
  }
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm', ...userFilterAbleFields]);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<Omit<User, 'password'>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched  successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.getSingleUser(id);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  }
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.user as JwtPayload;
    const updateAbleData = req.body;

    const result = await UserService.updateUser(id, updateAbleData, user);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Updated successfully!',
      data: result,
    });
  }
);
const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await UserService.deleteUser(id);

    sendResponse<User>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
  }
);
const generateUserPay: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    // const id = req.params.id;
    const user = req.user as JwtPayload;
    const result = await UserService.generateUserPay(user.userId);

    sendResponse<Pick<User, 'txId' | 'id' | 'email'> | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User pay url successfully generate!',
      data: result,
    });
  }
);
const adminOverview: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserService.adminOverview();

    sendResponse<TAdminOverview>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin overview successfully!',
      data: result,
    });
  }
);
// const sellerOverview: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const user = req.user as JwtPayload;
//     const result = await UserService.sellerOverview(user.userId);

//     sendResponse<TSellerOverview>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Seller overview successfully!',
//       data: result,
//     });
//   }
// );
// const userOverview: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const user = req.user as JwtPayload;
//     const result = await UserService.userOverview(user.userId);

//     sendResponse<TUserOverview>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'User overview successfully!',
//       data: result,
//     });
//   }
// );

const sendUserQuery: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const des = req.body.description;
    const queryType = req.body.queryType;
    await UserService.sendUserQuery(user.userId, des, queryType);

    sendResponse<string>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully!',
      data: 'send',
    });
  }
);

export const UserController = {
  getAllUser,
  createUser,
  updateUser,
  getSingleUser,
  deleteUser,
  generateUserPay,
  adminOverview,
  // sellerOverview,
  // userOverview,
  sendUserQuery,
};
