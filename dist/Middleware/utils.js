"use strict";
// utils.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueSessionId = generateUniqueSessionId;
exports.generateJwtToken = generateJwtToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateUniqueSessionId() {
    // Example of generating a unique session ID
    return 'session_' + new Date().getTime() + Math.random().toString(36).substring(2);
}
function generateJwtToken(user) {
    // You might want to include other user information in the JWT
    return jsonwebtoken_1.default.sign({ id: user.id, admin: user.admin }, process.env.JWT_SECRET || 'your_secret', { expiresIn: '1h' });
}
//# sourceMappingURL=utils.js.map