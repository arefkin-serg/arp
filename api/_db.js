/**** USERS ****/

// Get user by uid
function getUser(uid) {}

// Get user by stripeCustomerId
function getUserByCustomerId(customerId) {}

// Update an existing user
function updateUser(uid, data) {}

// Update a user by their stripeCustomerId
function updateUserByCustomerId(customerId, data) {}

module.exports = {
  getUser,
  getUserByCustomerId,

  updateUser,
  updateUserByCustomerId,
};
