import { SavedCrowdFund } from '@prisma/client';
import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SavedCrowdFundService } from './savedCrowdFund.service';
const createSavedCrowdFund: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const SavedCrowdFundData = req.body;
    const user = req.user as JwtPayload;
    const result = await SavedCrowdFundService.createSavedCrowdFund({
      ...SavedCrowdFundData,
      ownById: user.userId,
    });
    sendResponse<SavedCrowdFund>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SavedCrowdFund Created successfully!',
      data: result,
    });
  }
);

const getAllSavedCrowdFund = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const result = await SavedCrowdFundService.getAllSavedCrowdFund(user.userId);

  sendResponse<SavedCrowdFund[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SavedCrowdFund retrieved successfully !',
    data: result,
  });
});

const getSingleSavedCrowdFund: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await SavedCrowdFundService.getSingleSavedCrowdFund(id);

    sendResponse<SavedCrowdFund>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SavedCrowdFund retrieved  successfully!',
      data: result,
    });
  }
);

const updateSavedCrowdFund: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updateAbleData = req.body;

    const result = await SavedCrowdFundService.updateSavedCrowdFund(
      id,
      updateAbleData
    );

    sendResponse<SavedCrowdFund>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SavedCrowdFund Updated successfully!',
      data: result,
    });
  }
);
const deleteSavedCrowdFund: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await SavedCrowdFundService.deleteSavedCrowdFund(id);

    sendResponse<SavedCrowdFund>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'SavedCrowdFund deleted successfully!',
      data: result,
    });
  }
);

export const SavedCrowdFundController = {
  getAllSavedCrowdFund,
  createSavedCrowdFund,
  updateSavedCrowdFund,
  getSingleSavedCrowdFund,
  deleteSavedCrowdFund,
};
