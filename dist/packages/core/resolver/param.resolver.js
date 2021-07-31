"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const decorator_param_type_1 = require("../constant/decorator-param-type");
let ParamResolver = class ParamResolver {
    constructor(metadataProvider) {
        this.metadataProvider = metadataProvider;
        this.params = [];
    }
    resolve(options) {
        const { instance, methodName } = options;
        const contentMetadata = this.metadataProvider.getContentDecoratorMetadata(instance, methodName);
        const contextMetadata = this.metadataProvider.getContextDecoratorMetadata(instance, methodName);
        if (!contentMetadata && !contextMetadata) {
            return;
        }
        const paramsTypes = this.metadataProvider.getParamTypesMetadata(instance, methodName);
        if (!paramsTypes) {
            return;
        }
        const paramItem = {
            instance,
            methodName,
            args: [],
        };
        if (contentMetadata) {
            paramItem.args[contentMetadata.parameterIndex] = {
                decoratorType: decorator_param_type_1.DecoratorParamType.CONTENT,
                paramType: paramsTypes[contentMetadata.parameterIndex],
            };
        }
        if (contextMetadata) {
            paramItem.args[contextMetadata.parameterIndex] = {
                decoratorType: decorator_param_type_1.DecoratorParamType.CONTEXT,
            };
        }
        this.params.push(paramItem);
    }
    applyParam(options) {
        const { instance, methodName, content, context } = options;
        const paramsList = this.params.find((item) => item.instance === instance && item.methodName === methodName);
        if (!paramsList) {
            return;
        }
        return paramsList.args.map((arg) => {
            switch (arg.decoratorType) {
                case decorator_param_type_1.DecoratorParamType.CONTENT:
                    return content;
                case decorator_param_type_1.DecoratorParamType.CONTEXT:
                    return context;
            }
        });
    }
    getContentType(options) {
        var _a;
        const { instance, methodName } = options;
        const paramsList = this.params.find((item) => item.instance === instance && item.methodName === methodName);
        if (!paramsList) {
            return;
        }
        return (_a = paramsList.args.find((item) => item.decoratorType === decorator_param_type_1.DecoratorParamType.CONTENT)) === null || _a === void 0 ? void 0 : _a.paramType;
    }
};
ParamResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider])
], ParamResolver);
exports.ParamResolver = ParamResolver;
