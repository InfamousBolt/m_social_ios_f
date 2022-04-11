"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEmailSignup = exports.banUser = exports.editProfile = exports.handleGroupMsg = exports.handleChatMsg = void 0;
const admin = require("firebase-admin");
admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });
var chat_msg_1 = require("./chat_msg");
Object.defineProperty(exports, "handleChatMsg", { enumerable: true, get: function () { return chat_msg_1.handleChatMsg; } });
var group_msg_1 = require("./group_msg");
Object.defineProperty(exports, "handleGroupMsg", { enumerable: true, get: function () { return group_msg_1.handleGroupMsg; } });
var profile_edit_1 = require("./profile_edit");
Object.defineProperty(exports, "editProfile", { enumerable: true, get: function () { return profile_edit_1.editProfile; } });
var ban_user_1 = require("./ban_user");
Object.defineProperty(exports, "banUser", { enumerable: true, get: function () { return ban_user_1.banUser; } });
var on_signup_1 = require("./on_signup");
Object.defineProperty(exports, "onEmailSignup", { enumerable: true, get: function () { return on_signup_1.onEmailSignup; } });
//# sourceMappingURL=index.js.map