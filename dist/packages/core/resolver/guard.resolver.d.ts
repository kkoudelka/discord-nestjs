import { ReflectMetadataProvider } from '../provider/reflect-metadata.provider';
import { ModuleRef } from '@nestjs/core';
import { DiscordGuardOptions } from './interface/discord-guard-options';
import { MethodResolveOptions } from './interface/method-resolve-options';
import { MethodResolver } from './interface/method-resolver';
import { GuardType } from '../util/type/guard-type';
import { DiscordService } from '../service/discord.service';
export declare class GuardResolver implements MethodResolver {
    private readonly metadataProvider;
    private readonly moduleRef;
    private readonly discordService;
    private readonly guardList;
    constructor(metadataProvider: ReflectMetadataProvider, moduleRef: ModuleRef, discordService: DiscordService);
    resolve(options: MethodResolveOptions): Promise<void>;
    addGuard(options: MethodResolveOptions, guards: GuardType[]): Promise<void>;
    applyGuard(options: DiscordGuardOptions): Promise<boolean>;
}
