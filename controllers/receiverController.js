const Receiver = require('../models/receiverModel');
const Operation = require('../models/operationModel')

class ReceiverController {
  // GET /receivers
  static async index(req, res) {
    try {
      const receivers = await Receiver.getAll();
      res.render("receivers/index", {receivers, title: "Recebedores"});
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar os recebedores');
    }
  }

  // GET /receivers/:id
    static show(req, res) {
        const receiver = Receiver.getById(req.params.id);
        if (!receiver) return res.send('Recebedor não encontrado.');

        const operations = Operation.findByReceiver(receiver.id);

        res.render('receivers/show', {
        receiver,
        operations,
        title: `Recebedor - ${receiver.name}`
        });
    }

  // GET /receivers/create
  static async createForm(req, res) {
    res.render('receivers/create');
  }

  // POST /receivers
  static async create(req, res) {
    try {
      const { name, balance } = req.body;

      await Receiver.create({ name, balance });

      res.redirect('/receivers');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao criar recebedor');
    }
  }

  // GET /receivers/:id/edit
  static async editForm(req, res) {
    try {
      const receiver = await Receiver.getById(req.params.id);

      if (!receiver) return res.status(404).send('Recebedor não encontrado');

      res.render('receivers/edit', { receiver });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao editar');
    }
  }

  // POST /receivers/:id
  static async update(req, res) {
    try {
      let { name, balance } = req.body;
      balance = Math.round(Number(balance) * 100);

      await Receiver.update(req.params.id, { name, balance });

      res.redirect('/receivers');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar recebedor');
    }
  }

  // POST /receivers/:id/delete
  static async delete(req, res) {
    try {
      await Receiver.delete(req.params.id);
      res.redirect('/receivers');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar recebedor');
    }
  }

  // POST /receivers/:id/add-balance
  static async addBalance(req, res) {
    try {
      const { amount } = req.body;

      if (!amount || isNaN(amount)) {
        return res.status(400).send('Valor inválido');
      }

      await Receiver.updateBalance(req.params.id, Number(amount));

      res.redirect(`/receivers/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar saldo');
    }
  }
}

module.exports = ReceiverController;
