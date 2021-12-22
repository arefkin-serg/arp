/*
  This file (db.js) is added to your codebase if you chose "None" for your
  database provider, but some of you components attempt to import db.js. 
  Rather than break your site, we include this file and just return dummy data
  when methods like useUser and createUser are used. To entirely remove auth from your 
  codebase search for "db.js" and remove all related code.
*/

/**** USERS ****/

export function useUser(uid) {
  return {
    data: {
      uid: uid,
      email: "fake-user@gmail.com",
    },
    status: "success",
    error: null,
  };
}

export function createUser(uid, data) {
  return Promise.resolve(true);
}

export function updateUser(uid, data) {
  return Promise.resolve(true);
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

export function useItem(id) {
  return {
    data: {
      id: id,
      name: "fake item",
    },
    status: "success",
    error: null,
  };
}

export function useItemsByOwner(owner) {
  return {
    data: [
      {
        id: 1,
        name: "fake item",
      },
    ],
    status: "success",
    error: null,
  };
}

export function createItem(data) {
  return Promise.resolve(true);
}

export function updateItem(id, data) {
  return Promise.resolve(true);
}

export function deleteItem(id) {
  return Promise.resolve(true);
}
