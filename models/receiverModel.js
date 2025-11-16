const db = require('../config/db');


class ReceiverModel {

  static getAll() {
    const stmt = db.prepare('SELECT * FROM receivers')
    return stmt.all()
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM receivers WHERE id = ?')
    return stmt.get(id)
  }

  static create(data) {
    const name = data.name;
    let balance = data.balance;

  // se vier string vazia ou undefined, coloca 0
    if (!balance || balance === '') {
      balance = 0;
    } else {
      // converte de reais para centavos
      balance = Math.round(parseFloat(balance) * 100);
    }

    const stmt = db.prepare(`
    INSERT INTO receivers (name, balance)
    VALUES (?, ?)
    `);

    const result = stmt.run(name, balance);

    const select = db.prepare('SELECT * FROM receivers WHERE id = ?');
    return select.get(result.lastInsertRowid);
  }


  static updateBalance(id, amountInCents) {
    const stmt = db.prepare(`
      UPDATE receivers 
      SET balance = balance + ? 
      WHERE id = ?
    `)
    return stmt.run(amountInCents, id)
  }

  static update(id, data) {
    const stmt = db.prepare(`
      UPDATE receivers
      SET name = ?, balance = ?
      WHERE id = ?
    `)

    stmt.run(data.name, data.balance, id)

    const select = db.prepare('SELECT * FROM receivers WHERE id = ?')
    return select.get(id)
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM receivers WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }
}

module.exports = ReceiverModel;
