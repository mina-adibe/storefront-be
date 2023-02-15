"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const PORT = 3000;
// add helmet to the app to protect against well-known vulnerabilities
app.use((0, helmet_1.default)());
// Add morgan to the app to log HTTP requests to the console
app.use((0, morgan_1.default)("combined"));
// middleware to parse the body of the request
app.use(express_1.default.json());
// middleware to limit request rate
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP, please try again later",
});
app.use(limiter);
app.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});
// make a middleware to handle 404 errors
app.use((_req, res) => {
    res.status(404).json({ message: "Not found ?????????" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
