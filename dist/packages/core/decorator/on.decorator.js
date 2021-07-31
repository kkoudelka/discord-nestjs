"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const On = (options) => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.ON_DECORATOR, options, target, propertyKey);
        return descriptor;
    };
};
exports.On = On;
