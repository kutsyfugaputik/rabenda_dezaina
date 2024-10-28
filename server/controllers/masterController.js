const { Masters } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class MasterController {
    async create(req, res) {
        const { user_id, specialization, years_of_experience, work_examples } = req.body;
        const master = await Masters.create({ user_id, specialization, years_of_experience, work_examples });
        return res.json(master);
    }

    async getAll(req, res) {
        const masters = await Masters.findAll();
        return res.json(masters);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const master = await Masters.findOne({ where: { id } });
        if (!master) {
            return next(ApiError.notFound('Master not found'));
        }
        return res.json(master);
    }
}

module.exports = new MasterController();
