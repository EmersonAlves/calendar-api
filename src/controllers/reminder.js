const {Router} = require('express');
const { validationResult } = require('express-validator');

const ReminderValidator = require('../validators/reminders');
const ReminderRepository = require('../repositories/reminder');

const router = Router();

router.post('/',ReminderValidator.create(), async (request, response)=>{
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(422).jsonp(errors.array());
    }

    const data = request.body;

    try{
        const result = await ReminderRepository.save({
            title: data.title,
            date: data.date,
            time: data.time,
            reminderDate: new Date(`${data.date}T${data.time}`),
            color: data.color,
            cityName: data.cityName || null,
            icon: data.icon
        });

        response.json({
            message: "Lembrete criado",
            data: result
        });
    } catch (error) {
        response.status(400).jsonp({ message: "Ocorreu um erro ao tentar salva lembrete", data: error });
    }
});

router.get('/find', async (request, response)=>{
    const startDate = request.query.startDate;
    const endDate = request.query.endDate;

    const results = await ReminderRepository.findAll(startDate, endDate);

    response.json({
        message: "Lembretes encontrados",
        data: results
    })
})


router.put('/:id', async (request, response)=>{
    const { id } = request.params;
    const data = request.body;

    const result = await ReminderRepository.update(id, {
        title: data.title,
        date: data.date,
        time: data.time,
        reminderDate: new Date(`${data.date}T${data.time}`),
        color: data.color,
        cityName: data.cityName || null,
        icon: data.icon
    })

    response.json({
        message: "Lembrete atualizado",
        data: result
    });
});

router.delete('/:id', async (request, response)=>{
    const { id } = request.params;
    const result = await ReminderRepository.delete(id);

    response.json({
        message: "Lembrete excluido",
        data: result
    });
});

module.exports = router;