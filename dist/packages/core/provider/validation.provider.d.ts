import { DiscordAPIError, MessageEmbed } from 'discord.js';
import { ValidationError } from 'class-validator';
import { TransformProvider } from './transform.provider';
export declare class ValidationProvider {
    private readonly transformProvider;
    private errorMessage;
    constructor(transformProvider: TransformProvider);
    getDefaultErrorMessage(err: Error | ValidationError[] | DiscordAPIError, messageContent: string): MessageEmbed;
    setErrorMessage(messageEmbed: MessageEmbed): void;
    getErrorMessage(): MessageEmbed;
    private getCauseName;
    private getCauseValue;
    private replaceStringValue;
}
