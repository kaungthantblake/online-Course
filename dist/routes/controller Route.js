"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const columnsController_1 = __importDefault(require("../controller/columnsController"));
const router = (0, express_1.Router)();
// Route for adding a column
router.post('/add-column', columnsController_1.default.addColumn);
// Route for updating a column
router.put('/update-column', columnsController_1.default.updateColumn);
// Route for deleting a column
router.delete('/delete-column', columnsController_1.default.deleteColumn);
exports.default = router;
//# sourceMappingURL=controller%20Route.js.map