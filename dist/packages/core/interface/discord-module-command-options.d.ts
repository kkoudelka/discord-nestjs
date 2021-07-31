import { TextChannelType } from '../util/type/text-channel-type';
export interface DiscordModuleCommandOptions {
    name: string;
    channels?: string[];
    users?: string[];
    channelType?: TextChannelType[];
}
