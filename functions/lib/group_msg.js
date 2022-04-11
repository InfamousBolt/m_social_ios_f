"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGroupMsg = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const send_notification_1 = require("./helpers/send_notification");
exports.handleGroupMsg = functions.firestore
    .document('groups/{gID}/messages/{msgID}')
    .onCreate(async (snapshot) => {
    var _a, _b;
    const message = snapshot.data();
    if (!message)
        return;
    const { groupID, fromID, fromName, content, type } = message;
    const group = (await admin.firestore().doc(`groups/${groupID}`).get()).data();
    if (!group)
        return;
    const { name: groupName } = group;
    let title = `${groupName}: ${fromName} sent you a message.`;
    let body = message.content
        ? message.content.length <= 100
            ? message.content
            : message.content.substring(0, 97) + '...'
        : '';
    if (type == 1) {
        title = `${groupName}: ${fromName} sent you a image.`;
        body = 'Image';
    }
    else if (type == 2) {
        title = `${groupName}: ${fromName} sent you a voice message.`;
        body = 'Voice';
    }
    else if (type == 3) {
        title = `${groupName}: ${fromName} sent you a video message.`;
        body = 'Video';
    }
    else if (type == 4) {
        title = `${groupName}: ${fromName} sent you a emoji.`;
        body = 'Emoji';
    }
    else if (type == 5) {
        title = `${groupName}: ${fromName} sent you a gif.`;
        body = 'GIF';
    }
    else if (type == 6) {
        title = `${groupName}: ${fromName} sent you a sticker.`;
        body = 'Sticker';
    }
    const members = (_a = group.members) !== null && _a !== void 0 ? _a : [];
    const mutedFor = (_b = group.mutedFor) !== null && _b !== void 0 ? _b : [];
    for (const uid of members) {
        if (mutedFor.includes(uid) || uid === fromID) {
            console.error(uid, 'muted group:', groupName);
            continue;
        }
        await (0, send_notification_1.sendNotification)(uid, title, body, { groupID, groupName, fromID, fromName, content, type: `${type}` }, 'group');
    }
});
//# sourceMappingURL=group_msg.js.map