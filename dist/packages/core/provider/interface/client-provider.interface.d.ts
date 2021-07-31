import { Client, WebhookClient } from 'discord.js';
export interface ClientProvider {
    getClient(): Client;
    getWebhookClient(): WebhookClient;
}
