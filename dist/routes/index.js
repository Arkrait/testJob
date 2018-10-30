"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("./register");
const router = express_1.Router();
router.use(register_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map