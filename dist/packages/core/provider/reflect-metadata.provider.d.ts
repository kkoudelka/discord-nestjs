import { MetadataProvider } from './interface/metadata.provider.interface';
import { ArgNumOptions } from '../decorator/interface/arg-num-options';
import { ClientDecoratorOptions } from '../decorator/interface/client-decorator-options';
import { DiscordParamDecoratorType } from '../decorator/interface/param-decorator-type';
import { MiddlewareOptions } from '../decorator/interface/middleware-options';
import { OnCommandDecoratorOptions } from '../decorator/interface/on-command-decorator-options';
import { OnDecoratorOptions } from '../decorator/interface/on-decorator-options';
import { GuardType } from '../util/type/guard-type';
import { PipeType } from '../util/type/pipe-type';
import { DiscordMiddleware } from '../decorator/interface/discord-middleware';
import { ArgRangeOptions } from '../decorator/interface/arg-range-options';
import { TransformToUserOptions } from '../decorator/interface/transform-to-user-options';
export declare class ReflectMetadataProvider implements MetadataProvider {
    getArgNumDecoratorMetadata(instance: unknown, propertyKey: string): (last?: number) => ArgNumOptions;
    getArgRangeDecoratorMetadata(instance: unknown, propertyKey: string): (last?: number) => ArgRangeOptions;
    getClientDecoratorMetadata(instance: unknown, propertyKey: string): ClientDecoratorOptions;
    getContentDecoratorMetadata(instance: unknown, methodName: string): DiscordParamDecoratorType;
    getContextDecoratorMetadata(instance: unknown, methodName: string): DiscordParamDecoratorType;
    getParamTypesMetadata(instance: unknown, methodName: string): any[];
    getMiddlewareDecoratorMetadata(instance: DiscordMiddleware): MiddlewareOptions;
    getOnCommandDecoratorMetadata(instance: unknown, methodName: string): OnCommandDecoratorOptions;
    getOnMessageDecoratorMetadata(instance: unknown, methodName: string): OnDecoratorOptions;
    getOnceMessageDecoratorMetadata(instance: unknown, methodName: string): OnDecoratorOptions;
    getUseGuardsDecoratorMetadata(instance: unknown, methodName?: string): GuardType[];
    getUsePipesDecoratorMetadata(instance: unknown, methodName?: string): PipeType[];
    getTransformToUserDecoratorMetadata(instance: unknown, methodName: string): TransformToUserOptions;
}
