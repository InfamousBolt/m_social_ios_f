"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleChatMsg = void 0;
const functions = require("firebase-functions");
const send_notification_1 = require("./helpers/send_notification");
exports.handleChatMsg = functions.firestore
    .document('chats/{chatId}/messages/{msgId}')
    .onCreate(async (snapshot) => {
    const message = snapshot.data();
    if (!message)
        return;
    const { fromID, fromName, toID, type } = message;
    let title = `${fromName} sent you a message.`;
    let body = message.content
        ? message.content.length <= 100
            ? message.content
            : message.content.substring(0, 97) + '...'
        : '';
    if (type == 1) {
        title = `${fromName} sent you a image.`;
        body = 'Image';
    }
    else if (type == 2) {
        title = `${fromName} sent you a voice message.`;
        body = 'Voice';
    }
    else if (type == 3) {
        title = `${fromName} sent you a video message.`;
        body = 'Video';
    }
    else if (type == 4) {
        title = `${fromName} sent you a emoji.`;
        body = 'Emoji';
    }
    else if (type == 5) {
        title = `${fromName} sent you a gif.`;
        body = 'GIF';
    }
    else if (type == 6) {
        title = `${fromName} sent you a sticker.`;
        body = 'Sticker';
    }
    return (0, send_notification_1.sendNotification)(toID, title, body, {
        fromID,
        fromName,
        toID,
        type: `${type}`,
    });
});
//# sourceMappingURL=chat_msg.js.map