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
exports.DiscordResolverService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const guard_resolver_1 = require("../resolver/guard.resolver");
const on_command_resolver_1 = require("../resolver/on-command.resolver");
const is_object_1 = require("../util/function/is-object");
const pipe_resolver_1 = require("../resolver/pipe.resolver");
const middleware_resolver_1 = require("../resolver/middleware.resolver");
const param_resolver_1 = require("../resolver/param.resolver");
const on_event_resolver_1 = require("../resolver/on-event.resolver");
const once_event_resolver_1 = require("../resolver/once-event.resolver");
const client_resolver_1 = require("../resolver/client.resolver");
const transform_param_resolver_1 = require("../resolver/transform-param.resolver");
const guard_class_resolver_1 = require("../resolver/guard-class.resolver");
const pipe_class_resolver_1 = require("../resolver/pipe-class.resolver");
let DiscordResolverService = class DiscordResolverService {
    constructor(discoveryService, guardResolver, metadataScanner, onCommandResolver, pipeResolver, middlewareResolver, paramResolver, onMessageResolver, onceMessageResolver, clientResolver, transformParamResolver, guardClassResolver, pipeClassResolver) {
        this.discoveryService = discoveryService;
        this.guardResolver = guardResolver;
        this.metadataScanner = metadataScanner;
        this.onCommandResolver = onCommandResolver;
        this.pipeResolver = pipeResolver;
        this.middlewareResolver = middlewareResolver;
        this.paramResolver = paramResolver;
        this.onMessageResolver = onMessageResolver;
        this.onceMessageResolver = onceMessageResolver;
        this.clientResolver = clientResolver;
        this.transformParamResolver = transformParamResolver;
        this.guardClassResolver = guardClassResolver;
        this.pipeClassResolver = pipeClassResolver;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            const providers = this.discoveryService.getProviders();
            const controllers = this.discoveryService.getControllers();
            yield this.resolveDecorators(providers, controllers);
        });
    }
    resolveDecorators(providers, controllers) {
        const classResolvers = [
            this.clientResolver,
            this.middlewareResolver,
            this.guardClassResolver,
            this.pipeClassResolver,
        ];
        const methodResolvers = [
            this.guardResolver,
            this.onMessageResolver,
            this.onCommandResolver,
            this.onceMessageResolver,
            this.pipeResolver,
            this.paramResolver,
            this.transformParamResolver,
        ];
        return Promise.all(providers
            .concat(controllers)
            .map((instanceWrapper) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a;
            const { instance } = instanceWrapper;
            if (!instance || !is_object_1.IsObject(instance)) {
                return;
            }
            try {
                for (var classResolvers_1 = __asyncValues(classResolvers), classResolvers_1_1; classResolvers_1_1 = yield classResolvers_1.next(), !classResolvers_1_1.done;) {
                    const resolver = classResolvers_1_1.value;
                    yield resolver.resolve({ instance });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (classResolvers_1_1 && !classResolvers_1_1.done && (_a = classResolvers_1.return)) yield _a.call(classResolvers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const methodNames = this.scanMetadata(instance);
            return Promise.all(methodNames.map((methodName) => __awaiter(this, void 0, void 0, function* () {
                var e_2, _b;
                try {
                    for (var methodResolvers_1 = __asyncValues(methodResolvers), methodResolvers_1_1; methodResolvers_1_1 = yield methodResolvers_1.next(), !methodResolvers_1_1.done;) {
                        const resolver = methodResolvers_1_1.value;
                        yield resolver.resolve({
                            instance,
                            methodName,
                        });
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (methodResolvers_1_1 && !methodResolvers_1_1.done && (_b = methodResolvers_1.return)) yield _b.call(methodResolvers_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            })));
        })));
    }
    scanMetadata(instance) {
        return this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (methodName) => methodName);
    }
};
DiscordResolverService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        guard_resolver_1.GuardResolver,
        core_1.MetadataScanner,
        on_command_resolver_1.OnCommandResolver,
        pipe_resolver_1.PipeResolver,
        middleware_resolver_1.MiddlewareResolver,
        param_resolver_1.ParamResolver,
        on_event_resolver_1.OnEventResolver,
        once_event_resolver_1.OnceEventResolver,
        client_resolver_1.ClientResolver,
        transform_param_resolver_1.TransformParamResolver,
        guard_class_resolver_1.GuardClassResolver,
        pipe_class_resolver_1.PipeClassResolver])
], DiscordResolverService);
exports.DiscordResolverService = DiscordResolverService;
