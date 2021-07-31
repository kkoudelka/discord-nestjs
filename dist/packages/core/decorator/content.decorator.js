"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const decorator_param_type_1 = require("../constant/decorator-param-type");
const Content = () => {
    return (target, propertyKey, parameterIndex) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.CONTENT_DECORATOR, { parameterIndex, type: decorator_param_type_1.DecoratorParamType.CONTENT }, target, propertyKey);
    };
};
exports.Content = Content;
