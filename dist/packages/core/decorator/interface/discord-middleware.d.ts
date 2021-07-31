import { ClientEvents } from 'discord.js';
export interface DiscordMiddleware<T = any> {
    use(event: keyof ClientEvents, context: T[]): Promise<void> | void;
}
