import { ClientEvents } from 'discord.js';
import { Type } from '@nestjs/common';
export interface DiscordPipeTransform<T = any, D = any> {
    transform(event: keyof ClientEvents, context: T, content?: D, type?: Type<D>): any | Promise<any>;
}
