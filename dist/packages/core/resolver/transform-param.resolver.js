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
exports.TransformParamResolver = void 0;
const common_1 = require("@nestjs/common");
const storage_1 = require("class-transformer/cjs/storage");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const param_resolver_1 = require("./param.resolver");
let TransformParamResolver = class TransformParamResolver {
    constructor(metadataProvider, paramResolver) {
        this.metadataProvider = metadataProvider;
        this.paramResolver = paramResolver;
        this.transformParamList = [];
    }
    resolve(options) {
        const { instance, methodName } = options;
        const paramType = this.paramResolver.getContentType({
            instance,
            methodName,
        });
        if (!paramType) {
            return;
        }
        const properties = storage_1.defaultMetadataStorage.getExposedProperties(paramType, 1);
        if (properties.length === 0) {
            return;
        }
        let last = 0;
        for (const propertyKey of properties) {
            const metadataArgNum = this.metadataProvider.getArgNumDecoratorMetadata(paramType.prototype, propertyKey);
            const metadataArgRange = this.metadataProvider.getArgRangeDecoratorMetadata(paramType.prototype, propertyKey);
            if (metadataArgNum) {
                const argNum = metadataArgNum(last);
                const metadataTransformToUser = this.metadataProvider.getTransformToUserDecoratorMetadata(paramType.prototype, propertyKey);
                this.transformParamList.push({
                    instance: paramType,
                    propertyKey,
                    last,
                    argNum,
                    transformToUser: metadataTransformToUser,
                });
                last = argNum.position;
            }
            if (metadataArgRange) {
                const argRange = metadataArgRange(last);
                const metadataTransformToUser = this.metadataProvider.getTransformToUserDecoratorMetadata(paramType.prototype, propertyKey);
                this.transformParamList.push({
                    instance: paramType,
                    propertyKey,
                    last,
                    argRange,
                    transformToUser: metadataTransformToUser,
                });
                last = argRange.toPosition;
            }
        }
    }
    getTransformParamByTarget(classType) {
        return this.transformParamList.filter((item) => item.instance === classType);
    }
    getTransformParamByTargetAndProperty(classType, propertyKey) {
        return this.transformParamList.find((item) => item.instance === classType && item.propertyKey === propertyKey);
    }
};
TransformParamResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider,
        param_resolver_1.ParamResolver])
], TransformParamResolver);
exports.TransformParamResolver = TransformParamResolver;
