"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banUser = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.banUser = functions.https.onCall(async (param) => {
    var _a, _b;
    const userID = param['userID'];
    if (!userID)
        return;
    const userDoc = await admin.firestore().collection('users').doc(userID).get();
    const isBanned = !((_b = (_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.isBanned) !== null && _b !== void 0 ? _b : false);
    await userDoc.ref.update({ isBanned: isBanned });
    await admin.auth().updateUser(userID, {
        disabled: isBanned
    });
});
//# sourceMappingURL=ban_user.js.map