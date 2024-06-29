"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), user_controller_1.UserController.getAllUser);
router.get('/super-admin/overview', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin), user_controller_1.UserController.adminOverview);
// router.get(
//   '/seller/overview',
//   auth(UserRole.seller),
//   UserController.sellerOverview
// );
// router.get('/user/overview', auth(UserRole.user), UserController.userOverview);
router.post('/send-query', (0, validateRequest_1.default)(user_validation_1.UserValidation.sendQueryValidation), (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), user_controller_1.UserController.sendUserQuery);
router.post('/generate-user-pay-url', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), user_controller_1.UserController.generateUserPay);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), user_controller_1.UserController.getSingleUser);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.user, client_1.UserRole.superAdmin), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateValidation), user_controller_1.UserController.updateUser);
router.delete('/:id', (0, auth_1.default)(client_1.UserRole.superAdmin), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
