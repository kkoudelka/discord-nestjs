import { Type } from '@nestjs/common';
import { TransformParamList } from './interface/transform-param-list';
import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { MethodResolveOptions } from './interface/method-resolve-options';
import { ParamResolver } from './param.resolver';
export declare class TransformParamResolver {
    private readonly metadataProvider;
    private readonly paramResolver;
    private readonly transformParamList;
    constructor(metadataProvider: ReflectMetadataProvider, paramResolver: ParamResolver);
    resolve(options: MethodResolveOptions): void;
    getTransformParamByTarget(classType: Type): TransformParamList[];
    getTransformParamByTargetAndProperty(classType: Type, propertyKey: string): TransformParamList;
}
