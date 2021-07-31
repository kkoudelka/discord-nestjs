"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectMetadataProvider = void 0;
const decorator_constant_1 = require("../constant/decorator.constant");
const common_1 = require("@nestjs/common");
let ReflectMetadataProvider = class ReflectMetadataProvider {
    getArgNumDecoratorMetadata(instance, propertyKey) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.ARG_NUM_DECORATOR, instance, propertyKey);
    }
    getArgRangeDecoratorMetadata(instance, propertyKey) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.ARG_RANGE_DECORATOR, instance, propertyKey);
    }
    getClientDecoratorMetadata(instance, propertyKey) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.CLIENT_DECORATOR, instance, propertyKey);
    }
    getContentDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.CONTENT_DECORATOR, instance, methodName);
    }
    getContextDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.CONTEXT_DECORATOR, instance, methodName);
    }
    getParamTypesMetadata(instance, methodName) {
        return Reflect.getMetadata('design:paramtypes', instance, methodName);
    }
    getMiddlewareDecoratorMetadata(instance) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.MIDDLEWARE_DECORATOR, instance);
    }
    getOnCommandDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.ON_COMMAND_DECORATOR, instance, methodName);
    }
    getOnMessageDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.ON_DECORATOR, instance, methodName);
    }
    getOnceMessageDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.ONCE_DECORATOR, instance, methodName);
    }
    getUseGuardsDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.USE_GUARDS_DECORATOR, instance, methodName);
    }
    getUsePipesDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.USE_PIPES_DECORATOR, instance, methodName);
    }
    getTransformToUserDecoratorMetadata(instance, methodName) {
        return Reflect.getMetadata(decorator_constant_1.DecoratorConstant.TRANSFORM_TO_USER_DECORATOR, instance, methodName);
    }
};
ReflectMetadataProvider = __decorate([
    common_1.Injectable()
], ReflectMetadataProvider);
exports.ReflectMetadataProvider = ReflectMetadataProvider;
