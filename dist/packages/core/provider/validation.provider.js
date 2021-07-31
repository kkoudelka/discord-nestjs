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
exports.ValidationProvider = void 0;
const common_1 = require("@nestjs/common");
const discord_js_1 = require("discord.js");
const class_validator_1 = require("class-validator");
const transform_provider_1 = require("./transform.provider");
let ValidationProvider = class ValidationProvider {
    constructor(transformProvider) {
        this.transformProvider = transformProvider;
    }
    getDefaultErrorMessage(err, messageContent) {
        if (err instanceof Array && err[0] instanceof class_validator_1.ValidationError) {
            return new discord_js_1.MessageEmbed()
                .setColor('#d21111')
                .setTitle('Your input is incorrect')
                .addFields(err.map((errItem) => {
                const positions = this.transformProvider.getArgPositions(errItem.target, errItem.property);
                const causeValue = this.getCauseValue(positions, messageContent);
                const name = this.getCauseName(positions);
                const value = Object.values(errItem.constraints).map((item) => this.replaceStringValue(item, causeValue));
                return {
                    inline: true,
                    name,
                    value,
                };
            }));
        }
        if (err instanceof discord_js_1.DiscordAPIError) {
            return new discord_js_1.MessageEmbed().setColor('#d21111').setTitle(err.message);
        }
        return new discord_js_1.MessageEmbed()
            .setColor('#d21111')
            .setTitle('Something unexpected happened');
    }
    setErrorMessage(messageEmbed) {
        this.errorMessage = messageEmbed;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    getCauseName(positions) {
        let name = '';
        if (positions.formPosition !== undefined) {
            if (positions.toPosition) {
                name += `from position: ${positions.formPosition + 1}, to position: ${positions.toPosition}`;
            }
            else {
                name += `at position: ${positions.formPosition + 1}`;
            }
        }
        return name;
    }
    getCauseValue(positions, messageContent) {
        var _a;
        const messageParts = messageContent.split(' ');
        const inputValue = messageParts
            .slice(positions.formPosition, (_a = positions.toPosition) !== null && _a !== void 0 ? _a : positions.formPosition + 1)
            .join(' ');
        if (!inputValue) {
            return null;
        }
        return `**__${inputValue}__**`;
    }
    replaceStringValue(inputString, replaceValue) {
        const itemParts = inputString.split(' ');
        itemParts.splice(0, 1, replaceValue);
        return ` - ${itemParts.join(' ')}`;
    }
};
ValidationProvider = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transform_provider_1.TransformProvider])
], ValidationProvider);
exports.ValidationProvider = ValidationProvider;
