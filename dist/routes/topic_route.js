"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const topic_controller_1 = __importDefault(require("../controller/topic_controller"));
const router = (0, express_1.Router)();
// Async handler utility to catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Routes for TopicController
router.post('/topic', asyncHandler((req, res) => topic_controller_1.default.CreateTopic(req, res)));
router.get('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.GetOneTopic(req, res)));
router.get('/topicGet', asyncHandler((req, res) => topic_controller_1.default.GetTopic(req, res))); // Get all topics
router.put('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.UpdateTopic(req, res)));
router.delete('/topic/:id', asyncHandler((req, res) => topic_controller_1.default.DeleteTopic(req, res)));
router.delete('/topic', asyncHandler((req, res) => topic_controller_1.default.DeleteAllTopic(req, res)));
exports.default = router;
//# sourceMappingURL=topic_route.js.map