const { Master } = require('../modules/tables/masters');
const ApiError = require('../error/ApiError.js');

class MasterController {
    async create(req, res) {
        const { user_id, specialization, years_of_experience, work_examples } = req.body;
        const master = await Master.create({ user_id, specialization, years_of_experience, work_examples });
        return res.json(master);
    }

    async getAll(req, res) {
        const masters = await Master.findAll();
        return res.json(masters);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const master = await Master.findOne({ where: { id } });
        if (!master) {
            return next(ApiError.notFound('Master not found'));
        }
        return res.json(master);
    }
}

module.exports = new MasterController();
