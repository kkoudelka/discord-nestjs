import { Type } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { ReflectMetadataProvider } from './reflect-metadata.provider';
import { ArgRangeOptions } from '../decorator/interface/arg-range-options';
import { TransformParamResolver } from '../resolver/transform-param.resolver';
import { DiscordService } from '../service/discord.service';
export declare class TransformProvider {
    private readonly metadataProvider;
    private readonly transformParamResolver;
    private readonly discordService;
    constructor(metadataProvider: ReflectMetadataProvider, transformParamResolver: TransformParamResolver, discordService: DiscordService);
    transformContent<T>(classType: Type<T>, inputData: string, options?: ClassTransformOptions): Promise<T>;
    getArgPositions(target: any, propertyKey: string): ArgRangeOptions;
    private getCleanUserId;
    private getArgNumValue;
    private getArgRangeValue;
    private getTransformValue;
    private getTransformValueFromArray;
    private findUser;
}
