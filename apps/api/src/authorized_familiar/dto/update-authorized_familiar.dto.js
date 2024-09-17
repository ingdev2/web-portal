"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthorizedFamiliarDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var UpdateAuthorizedFamiliarDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _last_name_decorators;
    var _last_name_initializers = [];
    var _last_name_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _cellphone_decorators;
    var _cellphone_initializers = [];
    var _cellphone_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _authentication_method_decorators;
    var _authentication_method_initializers = [];
    var _authentication_method_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateAuthorizedFamiliarDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.last_name = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _last_name_initializers, void 0));
                this.email = (__runInitializers(this, _last_name_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.cellphone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _cellphone_initializers, void 0));
                this.whatsapp = (__runInitializers(this, _cellphone_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
                this.authentication_method = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _authentication_method_initializers, void 0));
                __runInitializers(this, _authentication_method_extraInitializers);
            }
            UpdateAuthorizedFamiliarDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, minLength: 3 }, last_name: { required: true, type: function () { return String; }, minLength: 3 }, email: { required: true, type: function () { return String; } }, cellphone: { required: true, type: function () { return Number; } }, whatsapp: { required: true, type: function () { return Number; } }, authentication_method: { required: true, type: function () { return Number; } } };
            };
            return UpdateAuthorizedFamiliarDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _last_name_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _email_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEmail)()];
            _cellphone_decorators = [(0, class_validator_1.IsOptional)()];
            _whatsapp_decorators = [(0, class_validator_1.IsOptional)()];
            _authentication_method_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _last_name_decorators, { kind: "field", name: "last_name", static: false, private: false, access: { has: function (obj) { return "last_name" in obj; }, get: function (obj) { return obj.last_name; }, set: function (obj, value) { obj.last_name = value; } }, metadata: _metadata }, _last_name_initializers, _last_name_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _cellphone_decorators, { kind: "field", name: "cellphone", static: false, private: false, access: { has: function (obj) { return "cellphone" in obj; }, get: function (obj) { return obj.cellphone; }, set: function (obj, value) { obj.cellphone = value; } }, metadata: _metadata }, _cellphone_initializers, _cellphone_extraInitializers);
            __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
            __esDecorate(null, null, _authentication_method_decorators, { kind: "field", name: "authentication_method", static: false, private: false, access: { has: function (obj) { return "authentication_method" in obj; }, get: function (obj) { return obj.authentication_method; }, set: function (obj, value) { obj.authentication_method = value; } }, metadata: _metadata }, _authentication_method_initializers, _authentication_method_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateAuthorizedFamiliarDto = UpdateAuthorizedFamiliarDto;
