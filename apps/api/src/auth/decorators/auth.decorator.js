"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
var common_1 = require("@nestjs/common");
var auth_guard_1 = require("../guard/auth.guard");
var roles_guard_1 = require("../guard/roles.guard");
var roles_decorator_1 = require("./roles.decorator");
function Auth() {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return (0, common_1.applyDecorators)(roles_decorator_1.Roles.apply(void 0, roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
}
