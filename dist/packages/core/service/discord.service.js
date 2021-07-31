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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var DiscordService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordService = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const module_constant_1 = require("../constant/module.constant");
let DiscordService = DiscordService_1 = class DiscordService {
    constructor(options) {
        this.logger = new common_1.Logger(DiscordService_1.name);
        const { token, commandPrefix, allowGuilds, denyGuilds, allowCommands, webhook, usePipes, useGuards } = options, discordOption = __rest(options, ["token", "commandPrefix", "allowGuilds", "denyGuilds", "allowCommands", "webhook", "usePipes", "useGuards"]);
        this.client = new discord_js_1.Client(discordOption);
        this.clientToken = token;
        this.commandPrefix = commandPrefix;
        this.allowGuilds = allowGuilds;
        this.denyGuilds = denyGuilds;
        this.allowCommands = allowCommands !== null && allowCommands !== void 0 ? allowCommands : [];
        this.webhookClient = this.createWebhookClient(webhook);
        this.pipeList = usePipes !== null && usePipes !== void 0 ? usePipes : [];
        this.guardList = useGuards !== null && useGuards !== void 0 ? useGuards : [];
    }
    onApplicationBootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.login(this.clientToken);
            }
            catch (err) {
                this.logger.error('Failed to connect to Discord API');
                this.logger.error(err);
            }
        });
    }
    onApplicationShutdown() {
        this.client.destroy();
    }
    getCommandPrefix() {
        return this.commandPrefix;
    }
    getAllowCommands() {
        return this.allowCommands;
    }
    getClient() {
        return this.client;
    }
    getWebhookClient() {
        return this.webhookClient;
    }
    getPipes() {
        return this.pipeList;
    }
    getGuards() {
        return this.guardList;
    }
    isAllowGuild(guildId) {
        if (!this.allowGuilds) {
            return true;
        }
        return this.allowGuilds.includes(guildId);
    }
    isDenyGuild(guildId) {
        if (!this.denyGuilds) {
            return false;
        }
        return this.denyGuilds.includes(guildId);
    }
    createWebhookClient(webhookOptions) {
        if (webhookOptions) {
            return new discord_js_1.WebhookClient(webhookOptions.webhookId, webhookOptions.webhookToken);
        }
    }
};
DiscordService = DiscordService_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(module_constant_1.ModuleConstant.DISCORD_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], DiscordService);
exports.DiscordService = DiscordService;
