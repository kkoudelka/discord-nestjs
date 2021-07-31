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
exports.OnCommandResolver = void 0;
const common_1 = require("@nestjs/common");
const discord_service_1 = require("../service/discord.service");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const guard_resolver_1 = require("./guard.resolver");
const discord_handler_service_1 = require("../service/discord-handler.service");
const discord_access_service_1 = require("../service/discord-access.service");
const middleware_resolver_1 = require("./middleware.resolver");
const pipe_resolver_1 = require("./pipe.resolver");
const param_resolver_1 = require("./param.resolver");
const discord_catch_service_1 = require("../service/discord-catch.service");
let OnCommandResolver = class OnCommandResolver {
    constructor(guardResolver, metadataProvider, discordService, discordHandlerService, discordAccessService, middlewareResolver, pipeResolver, paramResolver, discordCatchService) {
        this.guardResolver = guardResolver;
        this.metadataProvider = metadataProvider;
        this.discordService = discordService;
        this.discordHandlerService = discordHandlerService;
        this.discordAccessService = discordAccessService;
        this.middlewareResolver = middlewareResolver;
        this.pipeResolver = pipeResolver;
        this.paramResolver = paramResolver;
        this.discordCatchService = discordCatchService;
        this.logger = new common_1.Logger();
    }
    resolve(options) {
        const { instance, methodName } = options;
        const metadata = this.metadataProvider.getOnCommandDecoratorMetadata(instance, methodName);
        if (!metadata) {
            return;
        }
        const { name, prefix = this.discordService.getCommandPrefix(), isRemovePrefix = true, isIgnoreBotMessage = true, isRemoveCommandName = true, isRemoveMessage = false, } = metadata;
        this.logger.log(`Initialize command: ${name}`);
        this.discordService.getClient().on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            if (isIgnoreBotMessage && message.author.bot) {
                return;
            }
            if (!this.discordAccessService.isAllowMessageGuild(message)) {
                return;
            }
            if (this.discordAccessService.isDenyMessageGuild(message)) {
                return;
            }
            let messageContent = message.content.trim();
            const messagePrefix = this.getPrefix(messageContent, prefix);
            const commandName = this.getCommandName(messageContent, messagePrefix.length);
            if (messagePrefix !== prefix || commandName !== name) {
                return;
            }
            const commandOptions = this.getCommandOptions(metadata);
            if (!this.discordAccessService.isAllowCommand(message, commandOptions)) {
                return;
            }
            if (isRemovePrefix) {
                messageContent = messageContent.slice(prefix.length);
            }
            if (isRemoveCommandName) {
                if (isRemovePrefix) {
                    messageContent = messageContent.slice(prefix.length + commandName.length);
                }
                else {
                    messageContent =
                        messageContent.substring(0, prefix.length) +
                            messageContent.substring(prefix.length + commandName.length);
                }
            }
            messageContent = messageContent.trim();
            const eventName = 'message';
            const context = [message];
            yield this.middlewareResolver.applyMiddleware(eventName, context);
            const isAllowFromGuards = yield this.guardResolver.applyGuard({
                instance,
                methodName,
                event: eventName,
                context,
            });
            if (!isAllowFromGuards) {
                return;
            }
            const paramType = this.paramResolver.getContentType({
                instance,
                methodName,
            });
            let pipeMessageContent;
            try {
                pipeMessageContent = yield this.pipeResolver.applyPipe({
                    instance,
                    methodName,
                    event: eventName,
                    context,
                    content: message.content,
                    type: paramType,
                });
                messageContent = pipeMessageContent !== null && pipeMessageContent !== void 0 ? pipeMessageContent : messageContent;
            }
            catch (err) {
                yield this.discordCatchService.pipeExceptionFactory(err, message);
                return;
            }
            const argsFromDecorator = this.paramResolver.applyParam({
                instance,
                methodName,
                context,
                content: messageContent,
            });
            const handlerArgs = argsFromDecorator !== null && argsFromDecorator !== void 0 ? argsFromDecorator : context;
            yield this.discordHandlerService.callHandler(instance, methodName, handlerArgs);
            if (isRemoveMessage) {
                yield this.removeMessageFromChannel(message);
            }
        }));
    }
    getPrefix(messageContent, prefix) {
        return messageContent.slice(0, prefix.length);
    }
    getCommandName(messageContent, prefixLength) {
        const messageWithoutPrefix = messageContent.slice(prefixLength);
        const command = messageWithoutPrefix.split(' ').shift();
        return command || '';
    }
    removeMessageFromChannel(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield message.delete();
        });
    }
    getCommandOptions(metadata) {
        var _a;
        const { allowChannels, allowUsers, channelType, name } = metadata;
        const globalCommandOptions = this.discordService.getAllowCommands();
        const commandOptions = (_a = globalCommandOptions.find((options) => options.name === name)) !== null && _a !== void 0 ? _a : { name };
        if (allowChannels) {
            commandOptions.channels = allowChannels;
        }
        if (allowUsers) {
            commandOptions.users = allowUsers;
        }
        if (channelType) {
            commandOptions.channelType = channelType;
        }
        return commandOptions;
    }
};
OnCommandResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [guard_resolver_1.GuardResolver,
        reflect_metadata_provider_1.ReflectMetadataProvider,
        discord_service_1.DiscordService,
        discord_handler_service_1.DiscordHandlerService,
        discord_access_service_1.DiscordAccessService,
        middleware_resolver_1.MiddlewareResolver,
        pipe_resolver_1.PipeResolver,
        param_resolver_1.ParamResolver,
        discord_catch_service_1.DiscordCatchService])
], OnCommandResolver);
exports.OnCommandResolver = OnCommandResolver;
