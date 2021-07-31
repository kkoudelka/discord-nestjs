"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var DiscordModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const module_constant_1 = require("./constant/module.constant");
const discord_client_provider_1 = require("./provider/discord-client-provider");
const discord_service_1 = require("./service/discord.service");
const reflect_metadata_provider_1 = require("./provider/reflect-metadata.provider");
const discord_handler_service_1 = require("./service/discord-handler.service");
const discord_access_service_1 = require("./service/discord-access.service");
const guard_resolver_1 = require("./resolver/guard.resolver");
const on_command_resolver_1 = require("./resolver/on-command.resolver");
const discord_resolver_service_1 = require("./service/discord-resolver.service");
const middleware_resolver_1 = require("./resolver/middleware.resolver");
const pipe_resolver_1 = require("./resolver/pipe.resolver");
const param_resolver_1 = require("./resolver/param.resolver");
const on_event_resolver_1 = require("./resolver/on-event.resolver");
const once_event_resolver_1 = require("./resolver/once-event.resolver");
const client_resolver_1 = require("./resolver/client.resolver");
const transform_provider_1 = require("./provider/transform.provider");
const validation_provider_1 = require("./provider/validation.provider");
const transform_param_resolver_1 = require("./resolver/transform-param.resolver");
const discord_catch_service_1 = require("./service/discord-catch.service");
const guard_class_resolver_1 = require("./resolver/guard-class.resolver");
const pipe_class_resolver_1 = require("./resolver/pipe-class.resolver");
let DiscordModule = DiscordModule_1 = class DiscordModule {
    static forRoot(options) {
        return {
            module: DiscordModule_1,
            providers: [
                DiscordModule_1.createDiscordOptionProvider(options),
                middleware_resolver_1.MiddlewareResolver,
                guard_resolver_1.GuardResolver,
                pipe_resolver_1.PipeResolver,
                param_resolver_1.ParamResolver,
                on_event_resolver_1.OnEventResolver,
                once_event_resolver_1.OnceEventResolver,
                on_command_resolver_1.OnCommandResolver,
                transform_param_resolver_1.TransformParamResolver,
                reflect_metadata_provider_1.ReflectMetadataProvider,
                discord_handler_service_1.DiscordHandlerService,
                discord_access_service_1.DiscordAccessService,
                discord_catch_service_1.DiscordCatchService,
                discord_service_1.DiscordService,
                discord_client_provider_1.DiscordClientProvider,
                discord_resolver_service_1.DiscordResolverService,
                client_resolver_1.ClientResolver,
                transform_provider_1.TransformProvider,
                validation_provider_1.ValidationProvider,
                guard_class_resolver_1.GuardClassResolver,
                pipe_class_resolver_1.PipeClassResolver,
            ],
            exports: [discord_client_provider_1.DiscordClientProvider, transform_provider_1.TransformProvider, validation_provider_1.ValidationProvider],
        };
    }
    static forRootAsync(options) {
        return {
            module: DiscordModule_1,
            imports: options.imports || [],
            providers: [
                ...DiscordModule_1.createAsyncDiscordOptionProviders(options),
                middleware_resolver_1.MiddlewareResolver,
                guard_resolver_1.GuardResolver,
                pipe_resolver_1.PipeResolver,
                param_resolver_1.ParamResolver,
                on_event_resolver_1.OnEventResolver,
                once_event_resolver_1.OnceEventResolver,
                on_command_resolver_1.OnCommandResolver,
                transform_param_resolver_1.TransformParamResolver,
                reflect_metadata_provider_1.ReflectMetadataProvider,
                discord_handler_service_1.DiscordHandlerService,
                discord_access_service_1.DiscordAccessService,
                discord_catch_service_1.DiscordCatchService,
                discord_client_provider_1.DiscordClientProvider,
                discord_resolver_service_1.DiscordResolverService,
                discord_service_1.DiscordService,
                client_resolver_1.ClientResolver,
                transform_provider_1.TransformProvider,
                validation_provider_1.ValidationProvider,
                guard_class_resolver_1.GuardClassResolver,
                pipe_class_resolver_1.PipeClassResolver,
            ],
            exports: [discord_client_provider_1.DiscordClientProvider, transform_provider_1.TransformProvider, validation_provider_1.ValidationProvider],
        };
    }
    static createDiscordOptionProvider(options) {
        return {
            provide: module_constant_1.ModuleConstant.DISCORD_MODULE_OPTIONS,
            useValue: options || {},
        };
    }
    static createAsyncDiscordOptionProviders(options) {
        if (options) {
            if (options.useFactory) {
                return [
                    {
                        provide: module_constant_1.ModuleConstant.DISCORD_MODULE_OPTIONS,
                        useFactory: options.useFactory,
                        inject: options.inject || [],
                    },
                ];
            }
            else {
                const useClass = options.useClass;
                const providers = [
                    {
                        provide: module_constant_1.ModuleConstant.DISCORD_MODULE_OPTIONS,
                        useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return optionsFactory.createDiscordOptions(); }),
                        inject: [options.useExisting || options.useClass],
                    },
                ];
                if (useClass) {
                    providers.push({
                        provide: useClass,
                        useClass,
                    });
                }
                return providers;
            }
        }
        else {
            return [
                {
                    provide: module_constant_1.ModuleConstant.DISCORD_MODULE_OPTIONS,
                    useValue: {},
                },
            ];
        }
    }
};
DiscordModule = DiscordModule_1 = __decorate([
    common_1.Module({
        imports: [core_1.DiscoveryModule],
    })
], DiscordModule);
exports.DiscordModule = DiscordModule;
