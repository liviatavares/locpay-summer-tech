const db = require('../config/db');

class Operation {
    static create(data) {
        const stmt = db.prepare(`
            INSERT INTO operations (receiver_id, gross_value, fee, net_value, status)
            VALUES (?, ?, ?, ?, 'pending')
            RETURNING *;
        `);
    return stmt.get(data.receiver_id, data.gross_value, data.fee, data.net_value);
    }


    static findById(id) {
        const stmt = db.prepare('SELECT * FROM operations WHERE id = ?');
        return stmt.get(id);
    }

    static confirm(id) {
        const stmt = db.prepare(`
            UPDATE operations
            SET status = 'confirmed'
            WHERE id = ? AND status = 'pending'
            RETURNING *;
        `);
        return stmt.get(id);
    }

    static findByReceiver(receiver_id) {
        const stmt = db.prepare(`
            SELECT *
            FROM operations
            WHERE receiver_id = ?
        `);

        return stmt.all(receiver_id);
    }

}

module.exports = Operation;