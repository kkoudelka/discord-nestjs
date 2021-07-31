import { ValidationProvider } from '../provider/validation.provider';
import { ValidationError } from 'class-validator';
import { DiscordAPIError, Message } from 'discord.js';
export declare class DiscordCatchService {
    private readonly validationProvider;
    constructor(validationProvider: ValidationProvider);
    pipeExceptionFactory(err: Error | ValidationError[] | DiscordAPIError, message: Message): Promise<void>;
}
