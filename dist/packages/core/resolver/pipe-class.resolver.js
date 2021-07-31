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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipeClassResolver = void 0;
const common_1 = require("@nestjs/common");
const reflect_metadata_provider_1 = require("../provider/reflect-metadata.provider");
const core_1 = require("@nestjs/core");
const pipe_resolver_1 = require("./pipe.resolver");
let PipeClassResolver = class PipeClassResolver {
    constructor(pipeResolver, metadataProvide, metadataScanner) {
        this.pipeResolver = pipeResolver;
        this.metadataProvide = metadataProvide;
        this.metadataScanner = metadataScanner;
    }
    resolve(options) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { instance } = options;
            const metadata = this.metadataProvide.getUsePipesDecoratorMetadata(instance);
            if (!metadata) {
                return;
            }
            const allClassMethods = this.metadataScanner.getAllFilteredMethodNames(Object.getPrototypeOf(instance));
            try {
                for (var allClassMethods_1 = __asyncValues(allClassMethods), allClassMethods_1_1; allClassMethods_1_1 = yield allClassMethods_1.next(), !allClassMethods_1_1.done;) {
                    const methodName = allClassMethods_1_1.value;
                    yield this.pipeResolver.addPipe({
                        instance,
                        methodName,
                    }, metadata);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (allClassMethods_1_1 && !allClassMethods_1_1.done && (_a = allClassMethods_1.return)) yield _a.call(allClassMethods_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
};
PipeClassResolver = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [pipe_resolver_1.PipeResolver,
        reflect_metadata_provider_1.ReflectMetadataProvider,
        core_1.MetadataScanner])
], PipeClassResolver);
exports.PipeClassResolver = PipeClassResolver;
