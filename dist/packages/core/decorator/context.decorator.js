"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const decorator_param_type_1 = require("../constant/decorator-param-type");
const Context = () => {
    return (target, propertyKey, parameterIndex) => {
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.CONTEXT_DECORATOR, { parameterIndex, type: decorator_param_type_1.DecoratorParamType.CONTEXT }, target, propertyKey);
    };
};
exports.Context = Context;
