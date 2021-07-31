import { ClientEvents } from 'discord.js';
export interface DiscordGuard<T = any> {
    canActive(event: keyof ClientEvents, context: T[]): boolean | Promise<boolean>;
}
