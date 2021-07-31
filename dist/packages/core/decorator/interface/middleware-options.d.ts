import { ClientEvents } from 'discord.js';
import { InjectableOptions } from '@nestjs/common/decorators/core/injectable.decorator';
export interface MiddlewareOptions extends InjectableOptions {
    allowEvents?: Array<keyof ClientEvents>;
    denyEvents?: Array<keyof ClientEvents>;
}
