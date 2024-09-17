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
exports.CreateAuthorizedFamiliarDto = void 0;
var openapi = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateAuthorizedFamiliarDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _last_name_decorators;
    var _last_name_initializers = [];
    var _last_name_extraInitializers = [];
    var _id_number_decorators;
    var _id_number_initializers = [];
    var _id_number_extraInitializers = [];
    var _copy_familiar_identification_document_decorators;
    var _copy_familiar_identification_document_initializers = [];
    var _copy_familiar_identification_document_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _cellphone_decorators;
    var _cellphone_initializers = [];
    var _cellphone_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _rel_with_patient_decorators;
    var _rel_with_patient_initializers = [];
    var _rel_with_patient_extraInitializers = [];
    var _user_role_decorators;
    var _user_role_initializers = [];
    var _user_role_extraInitializers = [];
    var _user_gender_decorators;
    var _user_gender_initializers = [];
    var _user_gender_extraInitializers = [];
    var _user_id_type_decorators;
    var _user_id_type_initializers = [];
    var _user_id_type_extraInitializers = [];
    var _authentication_method_decorators;
    var _authentication_method_initializers = [];
    var _authentication_method_extraInitializers = [];
    var _verification_code_decorators;
    var _verification_code_initializers = [];
    var _verification_code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAuthorizedFamiliarDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.last_name = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _last_name_initializers, void 0));
                this.id_number = (__runInitializers(this, _last_name_extraInitializers), __runInitializers(this, _id_number_initializers, void 0));
                this.copy_familiar_identification_document = (__runInitializers(this, _id_number_extraInitializers), __runInitializers(this, _copy_familiar_identification_document_initializers, void 0));
                this.email = (__runInitializers(this, _copy_familiar_identification_document_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.cellphone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _cellphone_initializers, void 0));
                this.whatsapp = (__runInitializers(this, _cellphone_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
                this.rel_with_patient = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _rel_with_patient_initializers, void 0));
                this.user_role = (__runInitializers(this, _rel_with_patient_extraInitializers), __runInitializers(this, _user_role_initializers, void 0));
                this.user_gender = (__runInitializers(this, _user_role_extraInitializers), __runInitializers(this, _user_gender_initializers, void 0));
                this.user_id_type = (__runInitializers(this, _user_gender_extraInitializers), __runInitializers(this, _user_id_type_initializers, void 0));
                this.authentication_method = (__runInitializers(this, _user_id_type_extraInitializers), __runInitializers(this, _authentication_method_initializers, void 0));
                this.verification_code = (__runInitializers(this, _authentication_method_extraInitializers), __runInitializers(this, _verification_code_initializers, void 0));
                __runInitializers(this, _verification_code_extraInitializers);
            }
            CreateAuthorizedFamiliarDto._OPENAPI_METADATA_FACTORY = function () {
                return { name: { required: true, type: function () { return String; }, minLength: 3 }, last_name: { required: true, type: function () { return String; }, minLength: 3 }, id_number: { required: true, type: function () { return Number; } }, copy_familiar_identification_document: { required: true, type: function () { return [String]; } }, email: { required: true, type: function () { return String; } }, cellphone: { required: true, type: function () { return Number; } }, whatsapp: { required: true, type: function () { return Number; } }, rel_with_patient: { required: true, type: function () { return Number; } }, user_role: { required: true, type: function () { return Number; } }, user_gender: { required: true, type: function () { return Number; } }, user_id_type: { required: true, type: function () { return Number; } }, authentication_method: { required: true, type: function () { return Number; } }, verification_code: { required: true, type: function () { return Number; } } };
            };
            return CreateAuthorizedFamiliarDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '¡Por favor ingresa un nombre!' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _last_name_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '¡Por favor ingresa un apellido!' }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(3)];
            _id_number_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '¡Por favor ingresa un número de identificación!' })];
            _copy_familiar_identification_document_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)()];
            _email_decorators = [(0, class_validator_1.IsNotEmpty)({ message: '¡Por favor ingresa un correo electrónico!' }), (0, class_validator_1.IsEmail)()];
            _cellphone_decorators = [(0, class_validator_1.IsOptional)({ message: '¡Por favor ingresa un número de celular!' })];
            _whatsapp_decorators = [(0, class_validator_1.IsOptional)()];
            _rel_with_patient_decorators = [(0, class_validator_1.IsNotEmpty)({
                    message: '¡Por favor selecciona el parentesco con el paciente!',
                })];
            _user_role_decorators = [(0, class_validator_1.IsOptional)()];
            _user_gender_decorators = [(0, class_validator_1.IsNotEmpty)({
                    message: '¡Por favor selecciona el sexo del familiar!',
                })];
            _user_id_type_decorators = [(0, class_validator_1.IsNotEmpty)({
                    message: '¡Por favor selecciona el tipo de identificación!',
                })];
            _authentication_method_decorators = [(0, class_validator_1.IsOptional)({
                    message: '¡Por favor selecciona el método de autenticación!',
                })];
            _verification_code_decorators = [(0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _last_name_decorators, { kind: "field", name: "last_name", static: false, private: false, access: { has: function (obj) { return "last_name" in obj; }, get: function (obj) { return obj.last_name; }, set: function (obj, value) { obj.last_name = value; } }, metadata: _metadata }, _last_name_initializers, _last_name_extraInitializers);
            __esDecorate(null, null, _id_number_decorators, { kind: "field", name: "id_number", static: false, private: false, access: { has: function (obj) { return "id_number" in obj; }, get: function (obj) { return obj.id_number; }, set: function (obj, value) { obj.id_number = value; } }, metadata: _metadata }, _id_number_initializers, _id_number_extraInitializers);
            __esDecorate(null, null, _copy_familiar_identification_document_decorators, { kind: "field", name: "copy_familiar_identification_document", static: false, private: false, access: { has: function (obj) { return "copy_familiar_identification_document" in obj; }, get: function (obj) { return obj.copy_familiar_identification_document; }, set: function (obj, value) { obj.copy_familiar_identification_document = value; } }, metadata: _metadata }, _copy_familiar_identification_document_initializers, _copy_familiar_identification_document_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _cellphone_decorators, { kind: "field", name: "cellphone", static: false, private: false, access: { has: function (obj) { return "cellphone" in obj; }, get: function (obj) { return obj.cellphone; }, set: function (obj, value) { obj.cellphone = value; } }, metadata: _metadata }, _cellphone_initializers, _cellphone_extraInitializers);
            __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
            __esDecorate(null, null, _rel_with_patient_decorators, { kind: "field", name: "rel_with_patient", static: false, private: false, access: { has: function (obj) { return "rel_with_patient" in obj; }, get: function (obj) { return obj.rel_with_patient; }, set: function (obj, value) { obj.rel_with_patient = value; } }, metadata: _metadata }, _rel_with_patient_initializers, _rel_with_patient_extraInitializers);
            __esDecorate(null, null, _user_role_decorators, { kind: "field", name: "user_role", static: false, private: false, access: { has: function (obj) { return "user_role" in obj; }, get: function (obj) { return obj.user_role; }, set: function (obj, value) { obj.user_role = value; } }, metadata: _metadata }, _user_role_initializers, _user_role_extraInitializers);
            __esDecorate(null, null, _user_gender_decorators, { kind: "field", name: "user_gender", static: false, private: false, access: { has: function (obj) { return "user_gender" in obj; }, get: function (obj) { return obj.user_gender; }, set: function (obj, value) { obj.user_gender = value; } }, metadata: _metadata }, _user_gender_initializers, _user_gender_extraInitializers);
            __esDecorate(null, null, _user_id_type_decorators, { kind: "field", name: "user_id_type", static: false, private: false, access: { has: function (obj) { return "user_id_type" in obj; }, get: function (obj) { return obj.user_id_type; }, set: function (obj, value) { obj.user_id_type = value; } }, metadata: _metadata }, _user_id_type_initializers, _user_id_type_extraInitializers);
            __esDecorate(null, null, _authentication_method_decorators, { kind: "field", name: "authentication_method", static: false, private: false, access: { has: function (obj) { return "authentication_method" in obj; }, get: function (obj) { return obj.authentication_method; }, set: function (obj, value) { obj.authentication_method = value; } }, metadata: _metadata }, _authentication_method_initializers, _authentication_method_extraInitializers);
            __esDecorate(null, null, _verification_code_decorators, { kind: "field", name: "verification_code", static: false, private: false, access: { has: function (obj) { return "verification_code" in obj; }, get: function (obj) { return obj.verification_code; }, set: function (obj, value) { obj.verification_code = value; } }, metadata: _metadata }, _verification_code_initializers, _verification_code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAuthorizedFamiliarDto = CreateAuthorizedFamiliarDto;
