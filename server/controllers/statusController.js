const { Status } = require('../modules/tables/statuses');
const ApiError = require('../error/ApiError.js');

class StatusController {
    async create(req, res) {
        const { name, description } = req.body;
        const status = await Status.create({ name, description });
        return res.json(status);
    }

    async getAll(req, res) {
        const statuses = await Status.findAll();
        return res.json(statuses);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const status = await Status.findOne({ where: { id } });
        if (!status) {
            return next(ApiError.notFound('Status not found'));
        }
        return res.json(status);
    }
}

module.exports = new StatusController();