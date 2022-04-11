"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = void 0;
const functions = require("firebase-functions");
const firebase_admin_1 = require("firebase-admin");
exports.editProfile = functions.https.onCall(async (data) => {
    const { id, firstName, lastName, fullName, photoURL, coverPhotoURL } = data;
    if (!id) {
        console.error('no user id been given');
        return;
    }
    else if (!firstName &&
        !lastName &&
        !fullName &&
        !photoURL &&
        !coverPhotoURL) {
        console.error('no data to edit been given');
        return;
    }
    await (0, firebase_admin_1.firestore)().doc(`users/${id}`).update({
        firstName,
        lastName,
        fullName,
        photoURL,
        coverPhotoURL,
    });
    await handleProfileEdit(id, photoURL);
});
async function handleProfileEdit(userId, authorPhotoURL) {
    const posts = (await (0, firebase_admin_1.firestore)().collection('posts').where('authorID', '==', userId).get()).docs;
    for (const doc in posts) {
        if (posts.hasOwnProperty(doc)) {
            const post = posts[doc];
            await post.ref.update({ authorPhotoURL });
        }
    }
    const comments = (await (0, firebase_admin_1.firestore)()
        .collection('comments')
        .where('authorID', '==', userId)
        .get()).docs;
    for (const doc in comments) {
        if (comments.hasOwnProperty(doc)) {
            const comment = comments[doc];
            await comment.ref.update({ authorPhotoURL });
        }
    }
}
//# sourceMappingURL=profile_edit.js.map