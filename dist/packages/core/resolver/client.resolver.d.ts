import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { DiscordClientProvider } from '../provider/discord-client-provider';
import { ClassResolveOptions } from './interface/class-resolve-options';
import { ClassResolver } from './interface/class-resolver';
export declare class ClientResolver implements ClassResolver {
    private readonly metadataProvider;
    private readonly discordClientProvider;
    constructor(metadataProvider: ReflectMetadataProvider, discordClientProvider: DiscordClientProvider);
    resolve(options: ClassResolveOptions): void;
}
