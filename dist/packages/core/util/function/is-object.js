"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObject = void 0;
function IsObject(instance) {
    return typeof instance === 'object'
        ? instance !== null
        : typeof instance === 'function';
}
exports.IsObject = IsObject;
