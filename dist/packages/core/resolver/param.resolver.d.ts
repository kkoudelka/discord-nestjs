import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { ApplyPropertyOption } from './interface/apply-property-option';
import { MethodResolveOptions } from './interface/method-resolve-options';
import { MethodResolver } from './interface/method-resolver';
export declare class ParamResolver implements MethodResolver {
    private readonly metadataProvider;
    private readonly params;
    constructor(metadataProvider: ReflectMetadataProvider);
    resolve(options: MethodResolveOptions): void;
    applyParam(options: ApplyPropertyOption): any[];
    getContentType(options: MethodResolveOptions): any;
}
