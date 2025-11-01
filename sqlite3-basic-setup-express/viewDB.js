const Database = require("better-sqlite3");
const db = new Database("./test.db", { readonly: true });

const users = db.prepare("SELECT * FROM users").all();
console.table(users);

db.close();
