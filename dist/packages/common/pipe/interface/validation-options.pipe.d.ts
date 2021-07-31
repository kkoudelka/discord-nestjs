import { ValidationError } from 'class-validator';
import { ValidatorOptions } from 'class-validator/types/validation/ValidatorOptions';
import { DiscordAPIError, Message, MessageEmbed } from 'discord.js';
export interface ValidationOptionsPipe {
    validatorOptions?: ValidatorOptions;
    exceptionFactory?: (errors: Error | ValidationError[] | DiscordAPIError, message: Message) => MessageEmbed;
}
