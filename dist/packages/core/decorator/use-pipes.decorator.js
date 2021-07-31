"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePipes = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const UsePipes = (...pipes) => {
    return (target, propertyKey, descriptor) => {
        if (descriptor) {
            Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.USE_PIPES_DECORATOR, pipes, target, propertyKey);
            return descriptor;
        }
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.USE_PIPES_DECORATOR, pipes, target.prototype);
        return target;
    };
};
exports.UsePipes = UsePipes;
