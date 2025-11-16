const Database = require('better-sqlite3');
require('dotenv').config();

const db = new Database(process.env.DATABASE_FILE);

// cria as tabelas
db.exec(`
CREATE TABLE IF NOT EXISTS receivers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    balance INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS operations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    receiver_id INTEGER NOT NULL,
    gross_value INTEGER NOT NULL,
    fee INTEGER NOT NULL,
    net_value INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    FOREIGN KEY(receiver_id) REFERENCES receivers(id)
);
`);

module.exports = db;
