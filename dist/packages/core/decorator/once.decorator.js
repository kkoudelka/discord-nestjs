"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Once = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const Once = (options) => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.ONCE_DECORATOR, options, target, propertyKey);
        return descriptor;
    };
};
exports.Once = Once;
