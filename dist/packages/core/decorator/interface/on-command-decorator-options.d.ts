import { TextChannelType } from '../../util/type/text-channel-type';
export interface OnCommandDecoratorOptions {
    name: string;
    prefix?: string;
    isRemoveCommandName?: boolean;
    isRemovePrefix?: boolean;
    isIgnoreBotMessage?: boolean;
    allowChannels?: string[];
    isRemoveMessage?: boolean;
    allowUsers?: string[];
    channelType?: TextChannelType[];
}
