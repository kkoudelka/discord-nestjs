"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnCommand = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const OnCommand = (options) => {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.ON_COMMAND_DECORATOR, options, target, propertyKey);
        return descriptor;
    };
};
exports.OnCommand = OnCommand;
