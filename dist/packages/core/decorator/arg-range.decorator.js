"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgRange = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const ArgRange = (options) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.ARG_RANGE_DECORATOR, options, target, propertyKey);
    };
};
exports.ArgRange = ArgRange;
