import { DiscordPipeTransform } from '../../core';
import { ClientEvents, Message } from 'discord.js';
import { ValidationOptionsPipe } from './interface/validation-options.pipe';
import { ValidationProvider } from '../../core/provider/validation.provider';
export declare class ValidationPipe implements DiscordPipeTransform {
    private readonly validateOptions?;
    validationProvider: ValidationProvider;
    constructor(validateOptions?: ValidationOptionsPipe);
    transform(event: keyof ClientEvents, [context]: [Message], content?: any): Promise<any>;
}
