"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const firebase_admin_1 = require("firebase-admin");
async function sendNotification(uid, title, body, data, type = 'chat') {
    const user = (await (0, firebase_admin_1.firestore)().doc(`users/${uid}`).get()).data();
    if (!user) {
        console.error('User doesnt exist');
        return;
    }
    const { pushToken, chatNotify, groupsNotify } = user;
    if (!pushToken) {
        console.error('Invalid user push token', uid);
        return;
    }
    if (type === 'chat' && !chatNotify) {
        console.error('chatNotify is Disabled for', uid);
        return;
    }
    if (type === 'group' && !groupsNotify) {
        console.error('groupsNotify is disabled for', uid);
        return;
    }
    return (0, firebase_admin_1.messaging)()
        .sendToDevice(pushToken, {
        notification: {
            title,
            body,
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
        data,
    }, {
        priority: 'high',
    })
        .catch((e) => {
        console.error('Error Send To Device', e);
    });
}
exports.sendNotification = sendNotification;
//# sourceMappingURL=send_notification.js.map