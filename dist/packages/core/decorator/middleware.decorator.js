"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const common_1 = require("@nestjs/common");
const decorator_constant_1 = require("../constant/decorator.constant");
const Middleware = (options = {}) => {
    return (target) => {
        common_1.applyDecorators(common_1.Injectable(options));
        Reflect.defineMetadata(decorator_constant_1.DecoratorConstant.MIDDLEWARE_DECORATOR, options, target.prototype);
        return target;
    };
};
exports.Middleware = Middleware;
