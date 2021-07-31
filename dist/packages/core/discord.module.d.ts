import { DynamicModule } from '@nestjs/common';
import { DiscordModuleAsyncOptions } from './interface/discord-module-async-options';
import { DiscordModuleOption } from './interface/discord-module-option';
export declare class DiscordModule {
    static forRoot(options: DiscordModuleOption): DynamicModule;
    static forRootAsync(options: DiscordModuleAsyncOptions): DynamicModule;
    private static createDiscordOptionProvider;
    private static createAsyncDiscordOptionProviders;
}
