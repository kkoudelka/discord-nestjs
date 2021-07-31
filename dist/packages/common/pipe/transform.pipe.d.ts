import { ClientEvents } from 'discord.js';
import { Type } from '@nestjs/common';
import { DiscordPipeTransform, TransformProvider } from '../../core';
export declare class TransformPipe implements DiscordPipeTransform {
    private readonly transformProvider;
    constructor(transformProvider: TransformProvider);
    transform(event: keyof ClientEvents, context: any, content?: any, type?: Type): any;
}
