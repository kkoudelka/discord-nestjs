"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const discord_client_provider_1 = require("../provider/discord-client-provider");
let ClientResolver = class ClientResolver {
    constructor(metadataProvider, discordClientProvider) {
        this.metadataProvider = metadataProvider;
        this.discordClientProvider = discordClientProvider;
    }
    resolve(options) {
        const { instance } = options;
        for (const propertyKey in instance) {
            const metadata = this.metadataProvider.getClientDecoratorMetadata(instance, propertyKey);
            if (metadata) {
                instance[propertyKey] = this.discordClientProvider;
            }
        }
    }
};
ClientResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider,
        discord_client_provider_1.DiscordClientProvider])
], ClientResolver);
exports.ClientResolver = ClientResolver;
