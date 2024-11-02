const { Services } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class ServiceController {
    

    async getAll(req, res) {
        const services = await Services.findAll();
        return res.json(services);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const service = await Services.findOne({ where: { id } });
        if (!service) {
            return next(ApiError.notFound('Service not found'));
        }
        return res.json(service);
    }
}

module.exports = new ServiceController();
