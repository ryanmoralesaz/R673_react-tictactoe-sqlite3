const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

let sql;

// connect to db
const db = new sqlite3.Database("./test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
  console.log("Connected to database successfully!");
});

// DROP the old table first (to fix datatype mismatch)
sql = `DROP TABLE IF EXISTS users`;
db.run(sql, (err) => {
  if (err) {
    console.error("Error dropping table:", err.message);
  } else {
    console.log("Old table dropped (if it existed).");
    createTable();
  }
});

// create table
function createTable() {
  sql = `CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
  )`;

  db.run(sql, (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Table 'users' created with TEXT id!");
      seedDatabase();
    }
  });
}

// Function to seed database
function seedDatabase() {
  // Read seed data from JSON file
  fs.readFile("./seedData.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading seed data:", err.message);
      return;
    }

    try {
      const users = JSON.parse(data);

      // Insert each user
      const insertSql = `INSERT OR IGNORE INTO users (id, first_name, last_name, username, password, email) 
                         VALUES (?, ?, ?, ?, ?, ?)`;

      let insertedCount = 0;
      let skippedCount = 0;

      users.forEach((user, index) => {
        const userId = uuidv4();

        db.run(
          insertSql,
          [
            userId,
            user.first_name,
            user.last_name,
            user.username,
            user.password,
            user.email,
          ],
          function (err) {
            if (err) {
              console.error(
                `Error inserting user ${user.username}:`,
                err.message,
              );
              skippedCount++;
            } else if (this.changes > 0) {
              console.log(
                `✓ Inserted: ${user.first_name} ${user.last_name} (${userId.substring(0, 8)}...)`,
              );
              insertedCount++;
            } else {
              console.log(`⊘ Skipped: ${user.username} (already exists)`);
              skippedCount++;
            }

            // If this is the last user, show summary and query all
            if (index === users.length - 1) {
              setTimeout(() => {
                console.log(`\n--- Seeding Summary ---`);
                console.log(`Inserted: ${insertedCount} users`);
                console.log(`Skipped: ${skippedCount} users`);
                displayAllUsers();
              }, 100);
            }
          },
        );
      });
    } catch (parseErr) {
      console.error("Error parsing JSON:", parseErr.message);
    }
  });
}

// Function to display all users
function displayAllUsers() {
  sql = `SELECT * FROM users`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error querying users:", err.message);
      closeDatabase();
      return;
    }

    console.log("\n--- All Users in Database ---");
    if (rows.length === 0) {
      console.log("No users found.");
    } else {
      rows.forEach((row) => {
        console.log(`ID: ${row.id}`);
        console.log(`Name: ${row.first_name} ${row.last_name}`);
        console.log(`Username: ${row.username}`);
        console.log(`Email: ${row.email}`);
        console.log("---");
      });
      console.log(`Total users: ${rows.length}`);
    }

    closeDatabase();
  });
}

// Close database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("\nDatabase connection closed.");
    }
  });
}
