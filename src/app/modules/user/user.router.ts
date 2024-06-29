import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin),
  UserController.getAllUser
);
router.get(
  '/super-admin/overview',
  auth(UserRole.admin, UserRole.superAdmin),
  UserController.adminOverview
);
// router.get(
//   '/seller/overview',
//   auth(UserRole.seller),
//   UserController.sellerOverview
// );
// router.get('/user/overview', auth(UserRole.user), UserController.userOverview);
router.post(
  '/send-query',
  validateRequest(UserValidation.sendQueryValidation),
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  UserController.sendUserQuery
);
router.post(
  '/generate-user-pay-url',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  UserController.generateUserPay
);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  UserController.getSingleUser
);

router.patch(
  '/:id',
  auth(UserRole.admin, UserRole.user, UserRole.superAdmin),
  validateRequest(UserValidation.updateValidation),
  UserController.updateUser
);
router.delete('/:id', auth(UserRole.superAdmin), UserController.deleteUser);

export const UserRoutes = router;
