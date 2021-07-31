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
exports.DiscordAccessService = void 0;
const common_1 = require("@nestjs/common");
const discord_service_1 = require("./discord.service");
let DiscordAccessService = class DiscordAccessService {
    constructor(discordService) {
        this.discordService = discordService;
    }
    isAllowCommand(message, option) {
        if (!option) {
            return true;
        }
        if (option.channelType &&
            option.channelType.length !== 0 &&
            !option.channelType.includes(message.channel.type)) {
            return false;
        }
        if (option.users &&
            option.users.length !== 0 &&
            !option.users.includes(message.author.id)) {
            return false;
        }
        if (option.channels &&
            option.channels.length !== 0 &&
            !option.channels.includes(message.channel.id)) {
            return false;
        }
        return true;
    }
    isAllowMessageGuild(message) {
        const guildId = message.guild && message.guild.id;
        if (!!guildId) {
            return this.discordService.isAllowGuild(guildId);
        }
        return true;
    }
    isDenyMessageGuild(message) {
        const guildId = message.guild && message.guild.id;
        if (!!guildId) {
            return this.discordService.isDenyGuild(guildId);
        }
        return false;
    }
    isAllowGuild(data = []) {
        const guild = data.find((item) => !!item && !!item.guild);
        const guildId = !!guild && guild.guild.id;
        if (!!guildId) {
            return this.discordService.isAllowGuild(guildId);
        }
        return true;
    }
    isDenyGuild(data = []) {
        const guild = data.find((item) => !!item && !!item.guild);
        const guildId = !!guild && guild.guild.id;
        if (!!guildId) {
            return this.discordService.isDenyGuild(guildId);
        }
        return false;
    }
};
DiscordAccessService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [discord_service_1.DiscordService])
], DiscordAccessService);
exports.DiscordAccessService = DiscordAccessService;
