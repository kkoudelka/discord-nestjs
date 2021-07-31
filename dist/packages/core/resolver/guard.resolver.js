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
exports.GuardResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const core_1 = require("@nestjs/core");
const discord_service_1 = require("../service/discord.service");
let GuardResolver = class GuardResolver {
    constructor(metadataProvider, moduleRef, discordService) {
        this.metadataProvider = metadataProvider;
        this.moduleRef = moduleRef;
        this.discordService = discordService;
        this.guardList = [];
    }
    resolve(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName } = options;
            let guards = this.metadataProvider.getUseGuardsDecoratorMetadata(instance, methodName);
            if (!guards) {
                const onCommandMetadata = this.metadataProvider.getOnCommandDecoratorMetadata(instance, methodName);
                const onMessageMetadata = this.metadataProvider.getOnMessageDecoratorMetadata(instance, methodName);
                const onceMessageMetadata = this.metadataProvider.getOnceMessageDecoratorMetadata(instance, methodName);
                if (!onCommandMetadata && !onMessageMetadata && !onceMessageMetadata) {
                    return;
                }
                const guardsListForMethod = this.guardList.find((item) => item.methodName === methodName && item.instance === instance);
                if (guardsListForMethod) {
                    return;
                }
                guards = this.discordService.getGuards();
                if (guards.length === 0) {
                    return;
                }
            }
            yield this.addGuard(options, guards);
        });
    }
    addGuard(options, guards) {
        var guards_1, guards_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName } = options;
            const guardListForMethod = [];
            try {
                for (guards_1 = __asyncValues(guards); guards_1_1 = yield guards_1.next(), !guards_1_1.done;) {
                    const guard = guards_1_1.value;
                    const classType = typeof guard === 'function' ? guard : guard.constructor;
                    const newGuardInstance = yield this.moduleRef.create(classType);
                    guardListForMethod.push(newGuardInstance);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (guards_1_1 && !guards_1_1.done && (_a = guards_1.return)) yield _a.call(guards_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.guardList.push({
                instance,
                methodName,
                guardList: guardListForMethod,
            });
        });
    }
    applyGuard(options) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { instance, methodName, event, context } = options;
            const guardListForMethod = this.guardList.find((item) => item.methodName === methodName && item.instance === instance);
            if (!guardListForMethod) {
                return true;
            }
            try {
                for (var _b = __asyncValues(guardListForMethod.guardList), _c; _c = yield _b.next(), !_c.done;) {
                    const guard = _c.value;
                    const result = yield guard.canActive(event, context);
                    if (!result) {
                        return false;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return true;
        });
    }
};
GuardResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider,
        core_1.ModuleRef,
        discord_service_1.DiscordService])
], GuardResolver);
exports.GuardResolver = GuardResolver;
