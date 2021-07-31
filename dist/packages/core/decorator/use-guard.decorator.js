"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseGuards = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const UseGuards = (...guards) => {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.USE_GUARDS_DECORATOR, guards, target, propertyKey);
            return descriptor;
        }
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.USE_GUARDS_DECORATOR, guards, target.prototype);
        return target;
    };
};
exports.UseGuards = UseGuards;
