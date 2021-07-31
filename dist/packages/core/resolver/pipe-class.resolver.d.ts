import { ClassResolver } from './interface/class-resolver';
import { ClassResolveOptions } from './interface/class-resolve-options';
import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { MetadataScanner } from '@nestjs/core';
import { PipeResolver } from './pipe.resolver';
export declare class PipeClassResolver implements ClassResolver {
    private readonly pipeResolver;
    private readonly metadataProvide;
    private readonly metadataScanner;
    constructor(pipeResolver: PipeResolver, metadataProvide: ReflectMetadataProvider, metadataScanner: MetadataScanner);
    resolve(options: ClassResolveOptions): Promise<void>;
}
