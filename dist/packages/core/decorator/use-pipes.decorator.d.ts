import { DiscordPipeTransform } from './interface/discord-pipe-transform';
export declare const UsePipes: (...pipes: (DiscordPipeTransform | Function)[]) => MethodDecorator & ClassDecorator;
