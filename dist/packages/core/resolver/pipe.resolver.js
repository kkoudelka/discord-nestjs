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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipeResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const core_1 = require("@nestjs/core");
const discord_service_1 = require("../service/discord.service");
let PipeResolver = class PipeResolver {
    constructor(metadataProvider, moduleRef, discordService) {
        this.metadataProvider = metadataProvider;
        this.moduleRef = moduleRef;
        this.discordService = discordService;
        this.pipeList = [];
    }
    resolve(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName } = options;
            let pipes = this.metadataProvider.getUsePipesDecoratorMetadata(instance, methodName);
            if (!pipes) {
                const onCommandMetadata = this.metadataProvider.getOnCommandDecoratorMetadata(instance, methodName);
                const onMessageMetadata = this.metadataProvider.getOnMessageDecoratorMetadata(instance, methodName);
                const onceMessageMetadata = this.metadataProvider.getOnceMessageDecoratorMetadata(instance, methodName);
                if (!onCommandMetadata && !onMessageMetadata && !onceMessageMetadata) {
                    return;
                }
                const pipesListForMethod = this.pipeList.find((item) => item.methodName === methodName && item.instance === instance);
                if (pipesListForMethod) {
                    return;
                }
                pipes = this.discordService.getPipes();
                if (pipes.length === 0) {
                    return;
                }
                const contentInfo = this.metadataProvider.getContentDecoratorMetadata(instance, methodName);
                if (!contentInfo) {
                    return;
                }
                const argsTypeList = this.metadataProvider.getParamTypesMetadata(instance, methodName);
                if (argsTypeList.length === 0 ||
                    argsTypeList[contentInfo.parameterIndex] === String) {
                    return;
                }
            }
            yield this.addPipe(options, pipes);
        });
    }
    addPipe(options, pipes) {
        var pipes_1, pipes_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName } = options;
            const pipeListForMethod = [];
            try {
                for (pipes_1 = __asyncValues(pipes); pipes_1_1 = yield pipes_1.next(), !pipes_1_1.done;) {
                    const pipe = pipes_1_1.value;
                    const classType = typeof pipe === 'function' ? pipe : pipe.constructor;
                    const newPipeInstance = yield this.moduleRef.create(classType);
                    if (typeof pipe !== 'function') {
                        newPipeInstance.validateOptions = pipe['validateOptions'];
                    }
                    pipeListForMethod.push(newPipeInstance);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (pipes_1_1 && !pipes_1_1.done && (_a = pipes_1.return)) yield _a.call(pipes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.pipeList.push({
                instance,
                methodName,
                pipeList: pipeListForMethod,
            });
        });
    }
    applyPipe(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName, event, context, content, type } = options;
            const pipesListForMethod = this.pipeList.find((item) => item.methodName === methodName && item.instance === instance);
            if (!pipesListForMethod) {
                return;
            }
            return pipesListForMethod.pipeList.reduce((prev, curr) => __awaiter(this, void 0, void 0, function* () {
                const prevData = yield prev;
                return curr.transform(event, context, prevData, type);
            }), Promise.resolve(content));
        });
    }
};
PipeResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider,
        core_1.ModuleRef,
        discord_service_1.DiscordService])
], PipeResolver);
exports.PipeResolver = PipeResolver;
