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
exports.webHookService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const http_status_1 = __importDefault(require("http-status"));
const openai_1 = __importDefault(require("openai"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const webhook_utils_1 = require("./webhook.utils");
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.googleAi);
/* eslint-disable @typescript-eslint/no-explicit-any */
const payStackUserPaySuccess = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found to update!');
    }
    const upateUser = yield prisma_1.default.user.update({
        where: { id: userId },
        data: { isPaid: true },
    });
    return upateUser;
    //   return datas;
});
const openai = new openai_1.default({
    apiKey: config_1.default.openAiApi,
});
const threadByUser = {};
const aiSupport = (userId, message) => __awaiter(void 0, void 0, void 0, function* () {
    const assistantIdToUse = config_1.default.openAiAssistant_id; // Replace with your assistant ID
    // Spec // You should include the user ID in the request
    // Create a new thread if it's the user's first message
    if (!threadByUser[userId]) {
        try {
            const myThread = yield openai.beta.threads.create();
            console.log('New thread created with ID: ', myThread.id, '\n');
            threadByUser[userId] = myThread.id; // Store the thread ID for this user
        }
        catch (error) {
            console.error('Error creating thread:', error);
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Try again');
        }
    }
    const userMessage = message;
    // Add a Message to the Thread
    try {
        const myThreadMessage = yield openai.beta.threads.messages.create(threadByUser[userId], // Use the stored thread ID for this user
        {
            role: 'user',
            content: userMessage,
        });
        console.log('This is the message object: ', myThreadMessage, '\n');
        // Run the Assistant
        const myRun = yield openai.beta.threads.runs.create(threadByUser[userId], // Use the stored thread ID for this user
        {
            assistant_id: assistantIdToUse,
            // Your instructions here
            tools: [
                { type: 'code_interpreter' }, // Code interpreter tool
                { type: 'retrieval' }, // Retrieval tool
            ],
        });
        console.log('This is the run object: ', myRun, '\n');
        // Periodically retrieve the Run to check on its status
        const retrieveRun = () => __awaiter(void 0, void 0, void 0, function* () {
            let keepRetrievingRun;
            while (myRun.status !== 'completed') {
                keepRetrievingRun = yield openai.beta.threads.runs.retrieve(threadByUser[userId], // Use the stored thread ID for this user
                myRun.id);
                if (keepRetrievingRun.status === 'completed') {
                    console.log('\n');
                    break;
                }
            }
        });
        yield retrieveRun();
        // Retrieve the Messages added by the Assistant to the Thread
        const waitForAssistantMessage = () => __awaiter(void 0, void 0, void 0, function* () {
            yield retrieveRun();
            const allMessages = yield openai.beta.threads.messages.list(threadByUser[userId] // Use the stored thread ID for this user
            );
            // Send the response back to the front end
            console.log('------------------------------------------------------------ \n');
            if (allMessages.data[0].content[0].type === 'text') {
                return allMessages.data[0].content[0].text.value;
            }
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
        });
        return yield waitForAssistantMessage();
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong!');
    }
    //   return datas;
});
const googleAiSupport = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield prisma_1.default.faq.findMany();
    const strFaq = faq
        .map((single, i) => {
        return `
    ${28 + i}. ${single.question}.
    Ans: ${single.ans}
    `;
    })
        .join('\n');
    console.log(strFaq);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: (0, webhook_utils_1.AiInstruction)(strFaq),
    });
    const result = yield model.generateContent(`
 
  question: ${message}
  `);
    // console.log(result.response.text());
    return result.response.text();
});
exports.webHookService = {
    payStackUserPaySuccess,
    aiSupport,
    googleAiSupport,
};
