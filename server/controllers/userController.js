const { User } = require('../modules/tables/users.js');
const ApiError = require('../error/ApiError.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    async registration(req, res, next) {
        const { first_name, last_name, email, password } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email or password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ first_name, last_name, email, password: hashPassword });
        const token = generateJwt(user.id, user.email);
        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('User not found'));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Invalid password'));
        }
        const token = generateJwt(user.id, user.email);
        return res.json({ token });
    }

    async getAll(req, res) {
        const users = await User.findAll();
        return res.json(users);
    }
}

module.exports = new UserController();