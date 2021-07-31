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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
let MiddlewareResolver = class MiddlewareResolver {
    constructor(metadataProvider) {
        this.metadataProvider = metadataProvider;
        this.middlewareList = [];
    }
    resolve(options) {
        const { instance } = options;
        if (!this.instanceIsMiddleware(instance)) {
            return;
        }
        const metadata = this.metadataProvider.getMiddlewareDecoratorMetadata(instance);
        this.middlewareList.push({ instance, metadata });
    }
    applyMiddleware(event, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const filteredMiddleware = this.middlewareList.filter((item) => {
                const isAllowEvent = item.metadata.allowEvents &&
                    !item.metadata.allowEvents.includes(event);
                const isDenyEvent = item.metadata.denyEvents && item.metadata.denyEvents.includes(event);
                return !(isDenyEvent || isAllowEvent);
            });
            yield Promise.all(filteredMiddleware.map((item) => item.instance.use(event, context)));
        });
    }
    instanceIsMiddleware(instance) {
        return !!instance && !!instance.use;
    }
};
MiddlewareResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [reflect_metadata_provider_1.ReflectMetadataProvider])
], MiddlewareResolver);
exports.MiddlewareResolver = MiddlewareResolver;
