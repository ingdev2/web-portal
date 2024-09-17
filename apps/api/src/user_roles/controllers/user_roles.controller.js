"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRolesController = void 0;
var openapi = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var admin_roles_enum_1 = require("../../utils/enums/admin_roles.enum");
var swagger_1 = require("@nestjs/swagger");
var auth_decorator_1 = require("../../auth/decorators/auth.decorator");
var UserRolesController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('user-roles'), (0, swagger_1.ApiBearerAuth)(), (0, auth_decorator_1.Auth)(admin_roles_enum_1.AdminRolType.SUPER_ADMIN, admin_roles_enum_1.AdminRolType.ADMIN), (0, common_1.Controller)('user-roles')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createUserRole_decorators;
    var _getAllUserRoles_decorators;
    var _updateUserRole_decorators;
    var UserRolesController = _classThis = /** @class */ (function () {
        function UserRolesController_1(userRolesService) {
            this.userRolesService = (__runInitializers(this, _instanceExtraInitializers), userRolesService);
        }
        // POST METHODS //
        UserRolesController_1.prototype.createUserRole = function (createUserRole) {
            return this.userRolesService.createUserRole(createUserRole);
        };
        // GET METHODS //
        UserRolesController_1.prototype.getAllUserRoles = function () {
            return this.userRolesService.getAllUserRoles();
        };
        // PATCH METHODS //
        UserRolesController_1.prototype.updateUserRole = function (id, updateUserRole) {
            return this.userRolesService.updateUserRole(id, updateUserRole);
        };
        return UserRolesController_1;
    }());
    __setFunctionName(_classThis, "UserRolesController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createUserRole_decorators = [(0, common_1.Post)('/create'), openapi.ApiResponse({ status: 201, type: Object })];
        _getAllUserRoles_decorators = [(0, common_1.Get)('/getAll'), openapi.ApiResponse({ status: 200, type: Object })];
        _updateUserRole_decorators = [(0, common_1.Patch)('/update/:id'), openapi.ApiResponse({ status: 200 })];
        __esDecorate(_classThis, null, _createUserRole_decorators, { kind: "method", name: "createUserRole", static: false, private: false, access: { has: function (obj) { return "createUserRole" in obj; }, get: function (obj) { return obj.createUserRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllUserRoles_decorators, { kind: "method", name: "getAllUserRoles", static: false, private: false, access: { has: function (obj) { return "getAllUserRoles" in obj; }, get: function (obj) { return obj.getAllUserRoles; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserRole_decorators, { kind: "method", name: "updateUserRole", static: false, private: false, access: { has: function (obj) { return "updateUserRole" in obj; }, get: function (obj) { return obj.updateUserRole; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserRolesController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserRolesController = _classThis;
}();
exports.UserRolesController = UserRolesController;
