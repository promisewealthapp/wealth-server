"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHookController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const common_1 = require("../../../interfaces/common");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const orders_service_1 = require("../orders/orders.service");
const webhook_service_1 = require("./webhook.service");
const paystack = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const ipnData = req.body;
    if (ipnData.event === 'charge.success') {
        // const paymentReference = ipnData.data.reference;
        // Perform additional actions, such as updating your database, sending emails, etc.
        const paymentType = (_b = (_a = ipnData === null || ipnData === void 0 ? void 0 : ipnData.data) === null || _a === void 0 ? void 0 : _a.metadata) === null || _b === void 0 ? void 0 : _b.payment_type;
        const orderId = (_d = (_c = ipnData === null || ipnData === void 0 ? void 0 : ipnData.data) === null || _c === void 0 ? void 0 : _c.metadata) === null || _d === void 0 ? void 0 : _d.orderId;
        if (paymentType === common_1.EPaymentType.order) {
            // await CurrencyRequestService.payStackWebHook({
            //   reference: paymentReference,
            // });
            yield orders_service_1.OrdersService.updateOrders(orderId, {
                status: 'success',
                isPaid: true,
            });
        }
        else if (paymentType === common_1.EPaymentType.user) {
            yield webhook_service_1.webHookService.payStackUserPaySuccess(orderId);
        }
    }
    // const result = await webHookService.payStack(UserData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'successfull!',
        data: 'success',
    });
}));
const aiSupport = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = req.user as JwtPayload;
    const message = req.body.message;
    if (!message) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Please provide message');
    }
    // const data = await webHookService.aiSupport(user.userId, message);
    const data = yield webhook_service_1.webHookService.googleAiSupport(message);
    // const result = await webHookService.payStack(UserData);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'successfull!',
        data,
    });
}));
exports.webHookController = {
    paystack,
    aiSupport,
};
