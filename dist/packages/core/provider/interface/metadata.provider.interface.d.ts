import { OnCommandDecoratorOptions } from '../../decorator/interface/on-command-decorator-options';
import { OnDecoratorOptions } from '../../decorator/interface/on-decorator-options';
import { MiddlewareOptions } from '../../decorator/interface/middleware-options';
import { ClientDecoratorOptions } from '../../decorator/interface/client-decorator-options';
import { ArgNumOptions } from '../../decorator/interface/arg-num-options';
import { DiscordParamDecoratorType } from '../../decorator/interface/param-decorator-type';
import { PipeType } from '../../util/type/pipe-type';
import { GuardType } from '../../util/type/guard-type';
import { ArgRangeOptions } from '../../decorator/interface/arg-range-options';
import { TransformToUserOptions } from '../../decorator/interface/transform-to-user-options';
export interface MetadataProvider {
    getOnCommandDecoratorMetadata(instance: unknown, methodName: string): OnCommandDecoratorOptions;
    getOnMessageDecoratorMetadata(instance: unknown, methodName: string): OnDecoratorOptions;
    getOnceMessageDecoratorMetadata(instance: unknown, methodName: string): OnDecoratorOptions;
    getMiddlewareDecoratorMetadata(instance: unknown): MiddlewareOptions;
    getUsePipesDecoratorMetadata(instance: unknown, methodName?: string): PipeType[];
    getUseGuardsDecoratorMetadata(instance: unknown, methodName?: string): GuardType[];
    getClientDecoratorMetadata(instance: unknown, propertyKey: string): ClientDecoratorOptions;
    getArgNumDecoratorMetadata(instance: unknown, propertyKey: string): (last: number) => ArgNumOptions;
    getArgRangeDecoratorMetadata(instance: unknown, propertyKey: string): (last: number) => ArgRangeOptions;
    getTransformToUserDecoratorMetadata(instance: unknown, methodName: string): TransformToUserOptions;
    getContentDecoratorMetadata(instance: unknown, methodName: string): DiscordParamDecoratorType;
    getContextDecoratorMetadata(instance: unknown, methodName: string): DiscordParamDecoratorType;
    getParamTypesMetadata(instance: unknown, methodName: string): any[];
}
