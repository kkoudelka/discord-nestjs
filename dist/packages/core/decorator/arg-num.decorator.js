"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgNum = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const ArgNum = (options) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.ARG_NUM_DECORATOR, options, target, propertyKey);
    };
};
exports.ArgNum = ArgNum;
