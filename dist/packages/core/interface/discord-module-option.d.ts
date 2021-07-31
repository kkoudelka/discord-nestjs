import { ClientOptions } from 'discord.js';
import { DiscordModuleCommandOptions } from './discord-module-command-options';
import { DiscordModuleWebhookOptions } from './discord-module-webhook-options';
import { PipeType } from '../util/type/pipe-type';
import { GuardType } from '../util/type/guard-type';
export interface DiscordModuleOption extends ClientOptions {
    token: string;
    commandPrefix: string;
    allowGuilds?: string[];
    denyGuilds?: string[];
    allowCommands?: DiscordModuleCommandOptions[];
    usePipes?: PipeType[];
    useGuards?: GuardType[];
    webhook?: DiscordModuleWebhookOptions;
}
