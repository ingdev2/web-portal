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
exports.AuthorizedFamiliar = void 0;
var openapi = require("@nestjs/swagger");
var user_role_entity_1 = require("../../user_roles/entities/user_role.entity");
var gender_entity_1 = require("../../genders/entities/gender.entity");
var id_type_entity_1 = require("../../id_types/entities/id_type.entity");
var medical_req_entity_1 = require("../../medical_req/entities/medical_req.entity");
var rel_with_patient_entity_1 = require("../../rel_with_patient/entities/rel_with_patient.entity");
var authentication_method_entity_1 = require("../../authentication_method/entities/authentication_method.entity");
var typeorm_1 = require("typeorm");
var AuthorizedFamiliar = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _last_name_decorators;
    var _last_name_initializers = [];
    var _last_name_extraInitializers = [];
    var _gender_decorators;
    var _gender_initializers = [];
    var _gender_extraInitializers = [];
    var _user_gender_decorators;
    var _user_gender_initializers = [];
    var _user_gender_extraInitializers = [];
    var _id_type_decorators;
    var _id_type_initializers = [];
    var _id_type_extraInitializers = [];
    var _user_id_type_decorators;
    var _user_id_type_initializers = [];
    var _user_id_type_extraInitializers = [];
    var _id_number_decorators;
    var _id_number_initializers = [];
    var _id_number_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _user_role_decorators;
    var _user_role_initializers = [];
    var _user_role_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _cellphone_decorators;
    var _cellphone_initializers = [];
    var _cellphone_extraInitializers = [];
    var _whatsapp_decorators;
    var _whatsapp_initializers = [];
    var _whatsapp_extraInitializers = [];
    var _relationship_with_patient_decorators;
    var _relationship_with_patient_initializers = [];
    var _relationship_with_patient_extraInitializers = [];
    var _rel_with_patient_decorators;
    var _rel_with_patient_initializers = [];
    var _rel_with_patient_extraInitializers = [];
    var _medical_req_decorators;
    var _medical_req_initializers = [];
    var _medical_req_extraInitializers = [];
    var _accept_terms_decorators;
    var _accept_terms_initializers = [];
    var _accept_terms_extraInitializers = [];
    var _is_active_decorators;
    var _is_active_initializers = [];
    var _is_active_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updateAt_decorators;
    var _updateAt_initializers = [];
    var _updateAt_extraInitializers = [];
    var _deletedAt_decorators;
    var _deletedAt_initializers = [];
    var _deletedAt_extraInitializers = [];
    var _copy_familiar_identification_document_decorators;
    var _copy_familiar_identification_document_initializers = [];
    var _copy_familiar_identification_document_extraInitializers = [];
    var _patient_id_decorators;
    var _patient_id_initializers = [];
    var _patient_id_extraInitializers = [];
    var _patient_id_number_decorators;
    var _patient_id_number_initializers = [];
    var _patient_id_number_extraInitializers = [];
    var _familiar_authentication_method_decorators;
    var _familiar_authentication_method_initializers = [];
    var _familiar_authentication_method_extraInitializers = [];
    var _authentication_method_decorators;
    var _authentication_method_initializers = [];
    var _authentication_method_extraInitializers = [];
    var _verification_code_decorators;
    var _verification_code_initializers = [];
    var _verification_code_extraInitializers = [];
    var AuthorizedFamiliar = _classThis = /** @class */ (function () {
        function AuthorizedFamiliar_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.last_name = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _last_name_initializers, void 0));
            this.gender = (__runInitializers(this, _last_name_extraInitializers), __runInitializers(this, _gender_initializers, void 0));
            this.user_gender = (__runInitializers(this, _gender_extraInitializers), __runInitializers(this, _user_gender_initializers, void 0));
            this.id_type = (__runInitializers(this, _user_gender_extraInitializers), __runInitializers(this, _id_type_initializers, void 0));
            this.user_id_type = (__runInitializers(this, _id_type_extraInitializers), __runInitializers(this, _user_id_type_initializers, void 0));
            this.id_number = (__runInitializers(this, _user_id_type_extraInitializers), __runInitializers(this, _id_number_initializers, void 0));
            this.role = (__runInitializers(this, _id_number_extraInitializers), __runInitializers(this, _role_initializers, void 0));
            this.user_role = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _user_role_initializers, void 0));
            this.email = (__runInitializers(this, _user_role_extraInitializers), __runInitializers(this, _email_initializers, void 0));
            this.cellphone = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _cellphone_initializers, void 0));
            this.whatsapp = (__runInitializers(this, _cellphone_extraInitializers), __runInitializers(this, _whatsapp_initializers, void 0));
            this.relationship_with_patient = (__runInitializers(this, _whatsapp_extraInitializers), __runInitializers(this, _relationship_with_patient_initializers, void 0));
            this.rel_with_patient = (__runInitializers(this, _relationship_with_patient_extraInitializers), __runInitializers(this, _rel_with_patient_initializers, void 0));
            this.medical_req = (__runInitializers(this, _rel_with_patient_extraInitializers), __runInitializers(this, _medical_req_initializers, void 0));
            this.accept_terms = (__runInitializers(this, _medical_req_extraInitializers), __runInitializers(this, _accept_terms_initializers, void 0));
            this.is_active = (__runInitializers(this, _accept_terms_extraInitializers), __runInitializers(this, _is_active_initializers, void 0));
            this.createdAt = (__runInitializers(this, _is_active_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updateAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updateAt_initializers, void 0));
            this.deletedAt = (__runInitializers(this, _updateAt_extraInitializers), __runInitializers(this, _deletedAt_initializers, void 0));
            this.copy_familiar_identification_document = (__runInitializers(this, _deletedAt_extraInitializers), __runInitializers(this, _copy_familiar_identification_document_initializers, void 0));
            this.patient_id = (__runInitializers(this, _copy_familiar_identification_document_extraInitializers), __runInitializers(this, _patient_id_initializers, void 0));
            this.patient_id_number = (__runInitializers(this, _patient_id_extraInitializers), __runInitializers(this, _patient_id_number_initializers, void 0));
            this.familiar_authentication_method = (__runInitializers(this, _patient_id_number_extraInitializers), __runInitializers(this, _familiar_authentication_method_initializers, void 0));
            this.authentication_method = (__runInitializers(this, _familiar_authentication_method_extraInitializers), __runInitializers(this, _authentication_method_initializers, void 0));
            this.verification_code = (__runInitializers(this, _authentication_method_extraInitializers), __runInitializers(this, _verification_code_initializers, void 0));
            __runInitializers(this, _verification_code_extraInitializers);
        }
        AuthorizedFamiliar_1._OPENAPI_METADATA_FACTORY = function () {
            return { id: { required: true, type: function () { return String; } }, name: { required: true, type: function () { return String; } }, last_name: { required: true, type: function () { return String; } }, gender: { required: true, type: function () { return require("../../genders/entities/gender.entity").GenderType; } }, user_gender: { required: true, type: function () { return Number; } }, id_type: { required: true, type: function () { return require("../../id_types/entities/id_type.entity").IdTypeEntity; } }, user_id_type: { required: true, type: function () { return Number; } }, id_number: { required: true, type: function () { return Number; } }, role: { required: true, type: function () { return require("../../user_roles/entities/user_role.entity").UserRole; } }, user_role: { required: true, type: function () { return Number; } }, email: { required: true, type: function () { return String; } }, cellphone: { required: true, type: function () { return Number; } }, whatsapp: { required: true, type: function () { return Number; } }, relationship_with_patient: { required: true, type: function () { return require("../../rel_with_patient/entities/rel_with_patient.entity").RelWithPatient; } }, rel_with_patient: { required: true, type: function () { return Number; } }, medical_req: { required: true, type: function () { return [require("../../medical_req/entities/medical_req.entity").MedicalReq]; } }, accept_terms: { required: true, type: function () { return Boolean; } }, is_active: { required: true, type: function () { return Boolean; } }, createdAt: { required: true, type: function () { return Date; } }, updateAt: { required: true, type: function () { return Date; } }, deletedAt: { required: true, type: function () { return Date; } }, copy_familiar_identification_document: { required: true, type: function () { return [String]; } }, patient_id: { required: true, type: function () { return String; } }, patient_id_number: { required: true, type: function () { return Number; } }, familiar_authentication_method: { required: true, type: function () { return require("../../authentication_method/entities/authentication_method.entity").AuthenticationMethod; } }, authentication_method: { required: true, type: function () { return Number; } }, verification_code: { required: true, type: function () { return Number; } } };
        };
        return AuthorizedFamiliar_1;
    }());
    __setFunctionName(_classThis, "AuthorizedFamiliar");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _last_name_decorators = [(0, typeorm_1.Column)({ type: 'text' })];
        _gender_decorators = [(0, typeorm_1.ManyToOne)(function () { return gender_entity_1.GenderType; }, function (gender) { return gender.user; }), (0, typeorm_1.JoinColumn)({ name: 'user_gender', referencedColumnName: 'id' })];
        _user_gender_decorators = [(0, typeorm_1.Column)()];
        _id_type_decorators = [(0, typeorm_1.ManyToOne)(function () { return id_type_entity_1.IdTypeEntity; }, function (id_type) { return id_type.user; }), (0, typeorm_1.JoinColumn)({ name: 'user_id_type', referencedColumnName: 'id' })];
        _user_id_type_decorators = [(0, typeorm_1.Column)()];
        _id_number_decorators = [(0, typeorm_1.Column)({ type: 'bigint' })];
        _role_decorators = [(0, typeorm_1.ManyToOne)(function () { return user_role_entity_1.UserRole; }, function (role) { return role.familiar; }, {
                eager: true,
                cascade: true,
            }), (0, typeorm_1.JoinColumn)({ name: 'user_role', referencedColumnName: 'id' })];
        _user_role_decorators = [(0, typeorm_1.Column)()];
        _email_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _cellphone_decorators = [(0, typeorm_1.Column)({ type: 'bigint', unique: true, nullable: true })];
        _whatsapp_decorators = [(0, typeorm_1.Column)({ type: 'bigint', nullable: true })];
        _relationship_with_patient_decorators = [(0, typeorm_1.ManyToOne)(function () { return rel_with_patient_entity_1.RelWithPatient; }, function (relationship_with_patient) { return relationship_with_patient.familiar; }, {
                eager: true,
                cascade: true,
            }), (0, typeorm_1.JoinColumn)({ name: 'rel_with_patient', referencedColumnName: 'id' })];
        _rel_with_patient_decorators = [(0, typeorm_1.Column)()];
        _medical_req_decorators = [(0, typeorm_1.OneToMany)(function () { return medical_req_entity_1.MedicalReq; }, function (medical_req) { return medical_req.familiar; })];
        _accept_terms_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: false })];
        _is_active_decorators = [(0, typeorm_1.Column)({ type: 'boolean', default: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updateAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        _deletedAt_decorators = [(0, typeorm_1.DeleteDateColumn)()];
        _copy_familiar_identification_document_decorators = [(0, typeorm_1.Column)({ type: 'text', array: true, nullable: true })];
        _patient_id_decorators = [(0, typeorm_1.Column)({ type: 'uuid' })];
        _patient_id_number_decorators = [(0, typeorm_1.Column)({ type: 'bigint' })];
        _familiar_authentication_method_decorators = [(0, typeorm_1.ManyToOne)(function () { return authentication_method_entity_1.AuthenticationMethod; }, function (familiar_authentication_method) { return familiar_authentication_method.familiar; }), (0, typeorm_1.JoinColumn)({ name: 'authentication_method', referencedColumnName: 'id' })];
        _authentication_method_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        _verification_code_decorators = [(0, typeorm_1.Column)({ nullable: true })];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _last_name_decorators, { kind: "field", name: "last_name", static: false, private: false, access: { has: function (obj) { return "last_name" in obj; }, get: function (obj) { return obj.last_name; }, set: function (obj, value) { obj.last_name = value; } }, metadata: _metadata }, _last_name_initializers, _last_name_extraInitializers);
        __esDecorate(null, null, _gender_decorators, { kind: "field", name: "gender", static: false, private: false, access: { has: function (obj) { return "gender" in obj; }, get: function (obj) { return obj.gender; }, set: function (obj, value) { obj.gender = value; } }, metadata: _metadata }, _gender_initializers, _gender_extraInitializers);
        __esDecorate(null, null, _user_gender_decorators, { kind: "field", name: "user_gender", static: false, private: false, access: { has: function (obj) { return "user_gender" in obj; }, get: function (obj) { return obj.user_gender; }, set: function (obj, value) { obj.user_gender = value; } }, metadata: _metadata }, _user_gender_initializers, _user_gender_extraInitializers);
        __esDecorate(null, null, _id_type_decorators, { kind: "field", name: "id_type", static: false, private: false, access: { has: function (obj) { return "id_type" in obj; }, get: function (obj) { return obj.id_type; }, set: function (obj, value) { obj.id_type = value; } }, metadata: _metadata }, _id_type_initializers, _id_type_extraInitializers);
        __esDecorate(null, null, _user_id_type_decorators, { kind: "field", name: "user_id_type", static: false, private: false, access: { has: function (obj) { return "user_id_type" in obj; }, get: function (obj) { return obj.user_id_type; }, set: function (obj, value) { obj.user_id_type = value; } }, metadata: _metadata }, _user_id_type_initializers, _user_id_type_extraInitializers);
        __esDecorate(null, null, _id_number_decorators, { kind: "field", name: "id_number", static: false, private: false, access: { has: function (obj) { return "id_number" in obj; }, get: function (obj) { return obj.id_number; }, set: function (obj, value) { obj.id_number = value; } }, metadata: _metadata }, _id_number_initializers, _id_number_extraInitializers);
        __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
        __esDecorate(null, null, _user_role_decorators, { kind: "field", name: "user_role", static: false, private: false, access: { has: function (obj) { return "user_role" in obj; }, get: function (obj) { return obj.user_role; }, set: function (obj, value) { obj.user_role = value; } }, metadata: _metadata }, _user_role_initializers, _user_role_extraInitializers);
        __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
        __esDecorate(null, null, _cellphone_decorators, { kind: "field", name: "cellphone", static: false, private: false, access: { has: function (obj) { return "cellphone" in obj; }, get: function (obj) { return obj.cellphone; }, set: function (obj, value) { obj.cellphone = value; } }, metadata: _metadata }, _cellphone_initializers, _cellphone_extraInitializers);
        __esDecorate(null, null, _whatsapp_decorators, { kind: "field", name: "whatsapp", static: false, private: false, access: { has: function (obj) { return "whatsapp" in obj; }, get: function (obj) { return obj.whatsapp; }, set: function (obj, value) { obj.whatsapp = value; } }, metadata: _metadata }, _whatsapp_initializers, _whatsapp_extraInitializers);
        __esDecorate(null, null, _relationship_with_patient_decorators, { kind: "field", name: "relationship_with_patient", static: false, private: false, access: { has: function (obj) { return "relationship_with_patient" in obj; }, get: function (obj) { return obj.relationship_with_patient; }, set: function (obj, value) { obj.relationship_with_patient = value; } }, metadata: _metadata }, _relationship_with_patient_initializers, _relationship_with_patient_extraInitializers);
        __esDecorate(null, null, _rel_with_patient_decorators, { kind: "field", name: "rel_with_patient", static: false, private: false, access: { has: function (obj) { return "rel_with_patient" in obj; }, get: function (obj) { return obj.rel_with_patient; }, set: function (obj, value) { obj.rel_with_patient = value; } }, metadata: _metadata }, _rel_with_patient_initializers, _rel_with_patient_extraInitializers);
        __esDecorate(null, null, _medical_req_decorators, { kind: "field", name: "medical_req", static: false, private: false, access: { has: function (obj) { return "medical_req" in obj; }, get: function (obj) { return obj.medical_req; }, set: function (obj, value) { obj.medical_req = value; } }, metadata: _metadata }, _medical_req_initializers, _medical_req_extraInitializers);
        __esDecorate(null, null, _accept_terms_decorators, { kind: "field", name: "accept_terms", static: false, private: false, access: { has: function (obj) { return "accept_terms" in obj; }, get: function (obj) { return obj.accept_terms; }, set: function (obj, value) { obj.accept_terms = value; } }, metadata: _metadata }, _accept_terms_initializers, _accept_terms_extraInitializers);
        __esDecorate(null, null, _is_active_decorators, { kind: "field", name: "is_active", static: false, private: false, access: { has: function (obj) { return "is_active" in obj; }, get: function (obj) { return obj.is_active; }, set: function (obj, value) { obj.is_active = value; } }, metadata: _metadata }, _is_active_initializers, _is_active_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updateAt_decorators, { kind: "field", name: "updateAt", static: false, private: false, access: { has: function (obj) { return "updateAt" in obj; }, get: function (obj) { return obj.updateAt; }, set: function (obj, value) { obj.updateAt = value; } }, metadata: _metadata }, _updateAt_initializers, _updateAt_extraInitializers);
        __esDecorate(null, null, _deletedAt_decorators, { kind: "field", name: "deletedAt", static: false, private: false, access: { has: function (obj) { return "deletedAt" in obj; }, get: function (obj) { return obj.deletedAt; }, set: function (obj, value) { obj.deletedAt = value; } }, metadata: _metadata }, _deletedAt_initializers, _deletedAt_extraInitializers);
        __esDecorate(null, null, _copy_familiar_identification_document_decorators, { kind: "field", name: "copy_familiar_identification_document", static: false, private: false, access: { has: function (obj) { return "copy_familiar_identification_document" in obj; }, get: function (obj) { return obj.copy_familiar_identification_document; }, set: function (obj, value) { obj.copy_familiar_identification_document = value; } }, metadata: _metadata }, _copy_familiar_identification_document_initializers, _copy_familiar_identification_document_extraInitializers);
        __esDecorate(null, null, _patient_id_decorators, { kind: "field", name: "patient_id", static: false, private: false, access: { has: function (obj) { return "patient_id" in obj; }, get: function (obj) { return obj.patient_id; }, set: function (obj, value) { obj.patient_id = value; } }, metadata: _metadata }, _patient_id_initializers, _patient_id_extraInitializers);
        __esDecorate(null, null, _patient_id_number_decorators, { kind: "field", name: "patient_id_number", static: false, private: false, access: { has: function (obj) { return "patient_id_number" in obj; }, get: function (obj) { return obj.patient_id_number; }, set: function (obj, value) { obj.patient_id_number = value; } }, metadata: _metadata }, _patient_id_number_initializers, _patient_id_number_extraInitializers);
        __esDecorate(null, null, _familiar_authentication_method_decorators, { kind: "field", name: "familiar_authentication_method", static: false, private: false, access: { has: function (obj) { return "familiar_authentication_method" in obj; }, get: function (obj) { return obj.familiar_authentication_method; }, set: function (obj, value) { obj.familiar_authentication_method = value; } }, metadata: _metadata }, _familiar_authentication_method_initializers, _familiar_authentication_method_extraInitializers);
        __esDecorate(null, null, _authentication_method_decorators, { kind: "field", name: "authentication_method", static: false, private: false, access: { has: function (obj) { return "authentication_method" in obj; }, get: function (obj) { return obj.authentication_method; }, set: function (obj, value) { obj.authentication_method = value; } }, metadata: _metadata }, _authentication_method_initializers, _authentication_method_extraInitializers);
        __esDecorate(null, null, _verification_code_decorators, { kind: "field", name: "verification_code", static: false, private: false, access: { has: function (obj) { return "verification_code" in obj; }, get: function (obj) { return obj.verification_code; }, set: function (obj, value) { obj.verification_code = value; } }, metadata: _metadata }, _verification_code_initializers, _verification_code_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthorizedFamiliar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthorizedFamiliar = _classThis;
}();
exports.AuthorizedFamiliar = AuthorizedFamiliar;
