import { GuardResolver } from './guard.resolver';
import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { DiscordService } from '../service/discord.service';
import { DiscordHandlerService } from '../service/discord-handler.service';
import { DiscordAccessService } from '../service/discord-access.service';
import { MiddlewareResolver } from './middleware.resolver';
import { PipeResolver } from './pipe.resolver';
import { ParamResolver } from './param.resolver';
import { MethodResolveOptions } from './interface/method-resolve-options';
import { MethodResolver } from './interface/method-resolver';
import { DiscordCatchService } from '../service/discord-catch.service';
export declare class OnEventResolver implements MethodResolver {
    private readonly guardResolver;
    private readonly metadataProvider;
    private readonly discordService;
    private readonly discordHandlerService;
    private readonly discordAccessService;
    private readonly middlewareResolver;
    private readonly pipeResolver;
    private readonly paramResolver;
    private readonly discordCatchService;
    private readonly logger;
    constructor(guardResolver: GuardResolver, metadataProvider: ReflectMetadataProvider, discordService: DiscordService, discordHandlerService: DiscordHandlerService, discordAccessService: DiscordAccessService, middlewareResolver: MiddlewareResolver, pipeResolver: PipeResolver, paramResolver: ParamResolver, discordCatchService: DiscordCatchService);
    resolve(options: MethodResolveOptions): void;
}
