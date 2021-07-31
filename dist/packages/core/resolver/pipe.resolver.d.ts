import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { ModuleRef } from '@nestjs/core';
import { MethodResolveOptions } from './interface/method-resolve-options';
import { DiscordPipeOptions } from './interface/discord-pipe-options';
import { MethodResolver } from './interface/method-resolver';
import { PipeType } from '../util/type/pipe-type';
import { DiscordService } from '../service/discord.service';
export declare class PipeResolver implements MethodResolver {
    private readonly metadataProvider;
    private readonly moduleRef;
    private readonly discordService;
    private readonly pipeList;
    constructor(metadataProvider: ReflectMetadataProvider, moduleRef: ModuleRef, discordService: DiscordService);
    resolve(options: MethodResolveOptions): Promise<void>;
    addPipe(options: MethodResolveOptions, pipes: PipeType[]): Promise<void>;
    applyPipe(options: DiscordPipeOptions): Promise<any>;
}
