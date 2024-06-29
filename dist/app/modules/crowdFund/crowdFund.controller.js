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
exports.CrowdFundController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const sendNotification_1 = __importDefault(require("../../../helpers/sendNotification"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const crowdFund_constant_1 = require("./crowdFund.constant");
const crowdFund_service_1 = require("./crowdFund.service");
const createCrowdFund = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CrowdFundData = req.body;
    const result = yield crowdFund_service_1.CrowdFundService.createCrowdFund(CrowdFundData);
    (0, sendNotification_1.default)({ message: 'A new crowdfund listed !' });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund Created successfully!',
        data: result,
    });
}));
const recentlyFunded = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield crowdFund_service_1.CrowdFundService.recentlyFunded();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund Created successfully!',
        data: result,
    });
}));
const getAllCrowdFund = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, [
        'searchTerm',
        ...crowdFund_constant_1.crowdFundFilterAbleFields,
        ...crowdFund_constant_1.crowdFundFilterByPrice,
    ]);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield crowdFund_service_1.CrowdFundService.getAllCrowdFund(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleCrowdFund = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield crowdFund_service_1.CrowdFundService.getSingleCrowdFund(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund retrieved  successfully!',
        data: result,
    });
}));
const updateCrowdFund = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateAbleData = req.body;
    const result = yield crowdFund_service_1.CrowdFundService.updateCrowdFund(id, updateAbleData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund Updated successfully!',
        data: result,
    });
}));
const deleteCrowdFund = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield crowdFund_service_1.CrowdFundService.deleteCrowdFund(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'CrowdFund deleted successfully!',
        data: result,
    });
}));
exports.CrowdFundController = {
    getAllCrowdFund,
    createCrowdFund,
    updateCrowdFund,
    getSingleCrowdFund,
    deleteCrowdFund,
    recentlyFunded,
};
