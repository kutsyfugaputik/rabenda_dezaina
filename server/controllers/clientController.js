const { Clients } = require('../modules/modules');
const ApiError = require('../error/ApiError');
 
class ClientsController {
    async create(req, res) {
        const { client_id, user_id} = req.body;
        const clients = await Clients.create({ client_id, user_id });
        return res.json(clients);
    }

    async getAll(req, res) {
        const clients = await Clients.findAll();
        return res.json(clients);
    }

    async getById(req, res, next) {
        const { id } = req.params;
        const clients = await Clients.findOne({ where: { id } });
        if (!clients) {
            return next(ApiError.notFound('Service Type not found'));
        }
        return res.json(clients);
    }
}

module.exports = new ClientsController();