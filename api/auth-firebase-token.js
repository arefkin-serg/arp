const requireAuth = require("./_require-auth.js");
const firebaseAdmin = require("./_firebase.js");

exports.handler = requireAuth((event, context, callback) => {
  const user = event.user;

  return firebaseAdmin
    .auth()
    .createCustomToken(user.uid)
    .then((firebaseToken) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ status: "success", data: firebaseToken }),
      });
    })
    .catch((error) => {
      console.log("auth-firebase-token error", error);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          status: "error",
          message: "Something went wrong acquiring a Firebase token",
        }),
      });
    });
});
