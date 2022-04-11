"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEmailSignup = void 0;
const functions = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
exports.onEmailSignup = functions.auth.user().onCreate(async (user) => {
    if (!user.email)
        return;
    await (0, firebase_admin_1.firestore)().doc(`users/${user.uid}`).set({
        id: user.uid,
        email: user.email,
        username: 'admin',
        firstName: 'Admin',
        lastName: '',
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }, {
        merge: true,
    });
});
//# sourceMappingURL=on_signup.js.map