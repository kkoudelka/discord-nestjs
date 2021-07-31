"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformToUser = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const TransformToUser = (options = { throwError: false }) => {
    return (target, propertyKey) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.TRANSFORM_TO_USER_DECORATOR, options, target, propertyKey);
    };
};
exports.TransformToUser = TransformToUser;
