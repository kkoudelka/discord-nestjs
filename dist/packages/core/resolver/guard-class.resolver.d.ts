import { ClassResolver } from './interface/class-resolver';
import { ClassResolveOptions } from './interface/class-resolve-options';
import { GuardResolver } from './guard.resolver';
import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { MetadataScanner } from '@nestjs/core';
export declare class GuardClassResolver implements ClassResolver {
    private readonly guardResolver;
    private readonly metadataProvide;
    private readonly metadataScanner;
    constructor(guardResolver: GuardResolver, metadataProvide: ReflectMetadataProvider, metadataScanner: MetadataScanner);
    resolve(options: ClassResolveOptions): Promise<void>;
}
