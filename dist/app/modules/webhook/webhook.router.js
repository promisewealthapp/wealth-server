"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const webhook_controller_1 = require("./webhook.controller");
const router = express_1.default.Router();
router.post('/paystack', webhook_controller_1.webHookController.paystack);
router.post('/ai-support', (0, auth_1.default)(client_1.UserRole.admin, client_1.UserRole.superAdmin, client_1.UserRole.user), webhook_controller_1.webHookController.aiSupport);
router.get('/dollar-rate', webhook_controller_1.webHookController.dollarRate);
exports.WebHookRoutes = router;
