"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Orders_controller_1 = require("./Orders.controller");
const orders_validation_1 = require("./orders.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), Orders_controller_1.OrdersController.getAllOrders);
router.get('/:id', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), Orders_controller_1.OrdersController.getSingleOrders);
router.post('/', (0, auth_1.default)(client_1.UserRole.user), (0, validateRequest_1.default)(orders_validation_1.OrdersValidation.createValidation), Orders_controller_1.OrdersController.createOrders);
router.patch('/:id', (0, auth_1.default)(client_1.UserRole.user, client_1.UserRole.admin, client_1.UserRole.superAdmin), (0, validateRequest_1.default)(orders_validation_1.OrdersValidation.updateValidation), Orders_controller_1.OrdersController.updateOrders);
router.delete('/:id', Orders_controller_1.OrdersController.deleteOrders);
exports.OrdersRoutes = router;
