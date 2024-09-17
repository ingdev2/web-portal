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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpsCompany = void 0;
var openapi = require("@nestjs/swagger");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var EpsCompany = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _nit_decorators;
    var _nit_initializers = [];
    var _nit_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _main_email_decorators;
    var _main_email_initializers = [];
    var _main_email_extraInitializers = [];
    var _is_active_decorators;
    var _is_active_initializers = [];
    var _is_active_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var EpsCompany = _classThis = /** @class */ (function () {
        function EpsCompany_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.nit = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _nit_initializers, void 0));
            this.name = (__runInitializers(this, _nit_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.main_email = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _main_email_initializers, void 0));
            this.is_active = (__runInitializers(this, _main_email_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
            this.user = (__runInitializers(this, _is_active_extraInitializers), __runInitializers(this, _user_initializers, void 0));
            __runInitializers(this, _user_extraInitializers);
        }
        EpsCompany_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return Number; } }, nit: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, main_email: { required: true, type: function () { return String; } }, is_active: { required: true, type: function () { return Boolean; } }, user: { required: true, type: function () { return [require("../../users/entities/user.entity").User]; } } };
        };
        return EpsCompany_1;
    }());
    __setFunctionName(_classThis, "EpsCompany");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _nit_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _name_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _main_email_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _is_active_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _user_decorators = [(0, typeorm_1.OneToMany)(function () { return user_entity_1.User; }, function (user) { return user.eps; })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _nit_decorators, { kind: "field", name: "nit", static: false, private: false, access: { has: function (obj) { return "nit" in obj; }, get: function (obj) { return obj.nit; }, set: function (obj, value) { obj.nit = value; } }, metadata: _metadata }, _nit_initializers, _nit_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _main_email_decorators, { kind: "field", name: "main_email", static: false, private: false, access: { has: function (obj) { return "main_email" in obj; }, get: function (obj) { return obj.main_email; }, set: function (obj, value) { obj.main_email = value; } }, metadata: _metadata }, _main_email_initializers, _main_email_extraInitializers);
        __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: function (obj) { return "is_active" in obj; }, get: function (obj) { return obj.is_active; }, set: function (obj, value) { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
        __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EpsCompany = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EpsCompany = _classThis;
}();
exports.EpsCompany = EpsCompany;
