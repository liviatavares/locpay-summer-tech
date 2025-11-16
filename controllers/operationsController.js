const Operation = require('../models/operationModel');
const Receiver = require('../models/receiverModel');

class OperationsController {

    // FORM: criar nova operação
    static createForm(req, res) {
        const receivers = Receiver.getAll();
        
        res.render('operations/create', { 
            title: 'Nova Operação',
            receivers 
        });
    }

    // criar operação
    static create(req, res) {
        const { receiver_id } = req.body;

        if (!receiver_id) {
            return res.status(400).send("Recebedor inválido.");
        }

        // entrada em reais: converter para centavos
        const grossReais = Number(req.body.gross_value);
        if (isNaN(grossReais) || grossReais <= 0) {
            return res.status(400).send("Valor bruto inválido.");
        }

        const gross_value = Math.round(grossReais * 100);

        // regra: taxa 3%
        const fee = Math.round(gross_value * 0.03);
        const net_value = gross_value - fee;

        // cria operação no banco
        const op = Operation.create({
            receiver_id,
            gross_value,
            fee,
            net_value
        });

        // redireciona para página da operação
        res.redirect(`/operations/${op.id}`);
    }

    // mostrar operação
    static show(req, res) {
        const op = Operation.findById(req.params.id);

        if (!op) {
            return res.status(404).send("Operação não encontrada.");
        }

        res.render('operations/show', { 
            title: `Operação #${op.id}`,
            op 
        });
    }

    // confirmar operação
    static confirm(req, res) {
        const op = Operation.findById(req.params.id);

        if (!op) {
            return res.status(404).send("Operação não encontrada.");
        }

        if (op.status === 'confirmed') {
            return res.send("Operação já confirmada.");
        }

        // atualiza status no banco
        Operation.confirm(op.id);

        // credita saldo do recebedor
        Receiver.updateBalance(op.receiver_id, op.net_value);

        res.redirect(`/operations/${op.id}`);
    }
}

module.exports = OperationsController;
