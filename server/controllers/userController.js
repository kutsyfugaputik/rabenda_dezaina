const { Users } = require('../modules/modules');


class UserController {
 
    async getAll(req, res) {
        const users = await Users.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();