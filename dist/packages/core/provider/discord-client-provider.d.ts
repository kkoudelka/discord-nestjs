import { ClientProvider } from './interface/client-provider.interface';
import { Client, WebhookClient } from 'discord.js';
import { DiscordService } from '../service/discord.service';
export declare class DiscordClientProvider implements ClientProvider {
    private readonly discordService;
    constructor(discordService: DiscordService);
    getClient(): Client;
    getWebhookClient(): WebhookClient;
}
