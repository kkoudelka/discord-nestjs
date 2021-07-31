import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { ClassResolveOptions } from './interface/class-resolve-options';
import { ClientEvents } from 'discord.js';
import { ClassResolver } from './interface/class-resolver';
export declare class MiddlewareResolver implements ClassResolver {
    private readonly metadataProvider;
    private readonly middlewareList;
    constructor(metadataProvider: ReflectMetadataProvider);
    resolve(options: ClassResolveOptions): void;
    applyMiddleware(event: keyof ClientEvents, context: ClientEvents[keyof ClientEvents]): Promise<void>;
    private instanceIsMiddleware;
}
