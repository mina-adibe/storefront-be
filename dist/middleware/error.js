"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(err, _req, res, next) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
    next();
}
exports.default = errorMiddleware;
