const {check} = require('express-validator');

module.exports = {
    create: () => {
        return [
            check('title').notEmpty().withMessage("Titulo do lembrete é obrigatório"),
            check('date').notEmpty().isDate().withMessage("Data do lembrete é obrigatório"),
            check('time').notEmpty().matches( /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Horário do lembrete é obrigatório"),
            check('color').notEmpty().withMessage("Cor do lembrete é obrigatório"),
        ];
    }
}