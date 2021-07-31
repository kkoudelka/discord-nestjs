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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformProvider = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const reflect_metadata_provider_1 = require("./reflect-metadata.provider");
const transform_param_resolver_1 = require("../resolver/transform-param.resolver");
const discord_service_1 = require("../service/discord.service");
let TransformProvider = class TransformProvider {
    constructor(metadataProvider, transformParamResolver, discordService) {
        this.metadataProvider = metadataProvider;
        this.transformParamResolver = transformParamResolver;
        this.discordService = discordService;
    }
    transformContent(classType, inputData, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!classType || !inputData) {
                return;
            }
            const newObj = {};
            const inputPart = inputData.split(' ');
            const paramData = this.transformParamResolver.getTransformParamByTarget(classType);
            for (const item of paramData) {
                if (item.argNum) {
                    newObj[item.propertyKey] = this.getArgNumValue(inputPart, item);
                }
                if (item.argRange) {
                    newObj[item.propertyKey] = this.getArgRangeValue(inputPart, item);
                }
            }
            const newClass = class_transformer_1.plainToClass(classType, newObj, options);
            yield Promise.all(paramData.map((item) => __awaiter(this, void 0, void 0, function* () {
                if (item.transformToUser && item.argNum) {
                    const argNumValue = this.getArgNumValue(inputPart, item);
                    newClass[item.propertyKey] = yield this.getTransformValue(argNumValue, item);
                }
                if (item.transformToUser && item.argRange) {
                    const argRangeValue = this.getArgRangeValue(inputPart, item);
                    newClass[item.propertyKey] = yield this.getTransformValueFromArray(argRangeValue, item);
                }
            })));
            return newClass;
        });
    }
    getArgPositions(target, propertyKey) {
        const argData = this.transformParamResolver.getTransformParamByTargetAndProperty(target.constructor, propertyKey);
        if (argData) {
            if (argData.argNum) {
                return { formPosition: argData.argNum.position };
            }
            if (argData.argRange) {
                return {
                    formPosition: argData.argRange.formPosition,
                    toPosition: argData.argRange.toPosition,
                };
            }
        }
    }
    getCleanUserId(inputValue) {
        if (!inputValue) {
            return;
        }
        return inputValue
            .split('')
            .slice(3, inputValue.length - 1)
            .join('');
    }
    getArgNumValue(inputPart, item) {
        return inputPart[item.argNum.position];
    }
    getArgRangeValue(inputPart, item) {
        item.argRange.toPosition =
            item.argRange.toPosition !== undefined
                ? item.argRange.toPosition
                : inputPart.length;
        return inputPart.slice(item.argRange.formPosition, item.argRange.toPosition);
    }
    getTransformValue(value, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = this.getCleanUserId(value);
            if (!userId) {
                return;
            }
            return this.findUser(userId, item);
        });
    }
    getTransformValueFromArray(valueList, item) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIdList = valueList.map((value) => this.getCleanUserId(value));
            return Promise.all(userIdList.map((userId) => this.findUser(userId, item)));
        });
    }
    findUser(userId, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = this.discordService.getClient().users.cache.get(userId);
                if (!user) {
                    user = yield this.discordService.getClient().users.fetch(userId);
                }
                return user;
            }
            catch (err) {
                if (item.transformToUser.throwError) {
                    throw err;
                }
            }
        });
    }
};
TransformProvider = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider,
        transform_param_resolver_1.TransformParamResolver,
        discord_service_1.DiscordService])
], TransformProvider);
exports.TransformProvider = TransformProvider;
