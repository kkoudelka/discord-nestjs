import { DiscordService } from './discord.service';
import { DiscordModuleCommandOptions } from '../interface/discord-module-command-options';
import { Message } from 'discord.js';
export declare class DiscordAccessService {
    private readonly discordService;
    constructor(discordService: DiscordService);
    isAllowCommand(message: Message, option: DiscordModuleCommandOptions): boolean;
    isAllowMessageGuild(message: Message): boolean;
    isDenyMessageGuild(message: Message): boolean;
    isAllowGuild(data?: any[]): boolean;
    isDenyGuild(data?: any[]): boolean;
}
