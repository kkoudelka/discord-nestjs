import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { GuardResolver } from '../resolver/guard.resolver';
import { OnCommandResolver } from '../resolver/on-command.resolver';
import { PipeResolver } from '../resolver/pipe.resolver';
import { MiddlewareResolver } from '../resolver/middleware.resolver';
import { ParamResolver } from '../resolver/param.resolver';
import { OnEventResolver } from '../resolver/on-event.resolver';
import { OnceEventResolver } from '../resolver/once-event.resolver';
import { ClientResolver } from '../resolver/client.resolver';
import { TransformParamResolver } from '../resolver/transform-param.resolver';
import { GuardClassResolver } from '../resolver/guard-class.resolver';
import { PipeClassResolver } from '../resolver/pipe-class.resolver';
export declare class DiscordResolverService implements OnModuleInit {
    private readonly discoveryService;
    private readonly guardResolver;
    private readonly metadataScanner;
    private readonly onCommandResolver;
    private readonly pipeResolver;
    private readonly middlewareResolver;
    private readonly paramResolver;
    private readonly onMessageResolver;
    private readonly onceMessageResolver;
    private readonly clientResolver;
    private readonly transformParamResolver;
    private readonly guardClassResolver;
    private readonly pipeClassResolver;
    constructor(discoveryService: DiscoveryService, guardResolver: GuardResolver, metadataScanner: MetadataScanner, onCommandResolver: OnCommandResolver, pipeResolver: PipeResolver, middlewareResolver: MiddlewareResolver, paramResolver: ParamResolver, onMessageResolver: OnEventResolver, onceMessageResolver: OnceEventResolver, clientResolver: ClientResolver, transformParamResolver: TransformParamResolver, guardClassResolver: GuardClassResolver, pipeClassResolver: PipeClassResolver);
    onModuleInit(): Promise<void>;
    private resolveDecorators;
    private scanMetadata;
}
