"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const Client = () => {
    return (target, propertyKey) => {
        Reflect.set(target, propertyKey, null);
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.CLIENT_DECORATOR, {}, target, propertyKey);
    };
};
exports.Client = Client;
