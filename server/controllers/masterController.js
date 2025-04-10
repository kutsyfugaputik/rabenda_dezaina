const { Masters, Users } = require('../modules/modules');
const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const path = require('path');
const db = require('../modules/db'); // Подключаем объект базы данных, если он не был подключен ранее.

class MasterController {
    async loginMaster(req, res) {
        const { email, password } = req.body;
        console.log('📥 Запрос на авторизацию мастера:', email);
    
        try {
            console.log('🔍 Поиск пользователя по email...');
            const user = await Users.findOne({ where: { email } });
    
            if (!user) {
                console.log('❌ Пользователь не найден в таблице Users');
                return res.status(401).json({ message: 'Неверный email или пароль' });
            }
    
            console.log(`✅ Найден пользователь с id: ${user.user_id}, проверка пароля...`);
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                console.log(`❌ Неверный пароль для пользователя с email: ${email}`);
                return res.status(401).json({ message: 'Неверный email или пароль' });
            }
    
            console.log('🔍 Проверка, является ли пользователь мастером...');
            const master = await Masters.findOne({ where: { user_id: user.user_id } });
    
            if (!master) {
                console.log(`❌ Пользователь с id ${user.user_id} не найден в таблице Masters`);
                return res.status(403).json({ message: 'Доступ запрещен' });
            }
    
            console.log('🔐 Генерация JWT токена...');
            const token = jwt.sign(
                { id: user.user_id, role: 'master' },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
    
            console.log('🍪 Установка куки с токеном...');
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 3600000,
            });
    
            console.log(`✅ Мастер ${user.user_id} успешно вошел`);
            return res.json({ message: 'Успешный вход мастера' });
    
        } catch (error) {
            console.error('🔥 Ошибка авторизации мастера:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
    

    async getAll(req, res, next) {
        console.log('Запрошен список всех мастеров...');

        try {
            const masters = await Masters.findAll();
            console.log('Найдено мастеров:', masters.length);
            return res.json(masters);
        } catch (error) {
            console.error('Ошибка при получении списка мастеров:', error);
            return next(ApiError.internal('Не удалось получить список мастеров'));
        }
    }

    async getExampleWorks(req, res) {
        try {
            const master_id = req.params.master_id;
    
            if (!master_id) {
                return res.status(400).json({ error: 'master_id не передан' });
            }
    
            const result = await db.query(
                'SELECT work_examples FROM masters WHERE master_id = $1',
                {
                    bind: [master_id],
                    type: db.QueryTypes.SELECT
                }
            );
    
            if (!result || result.length === 0) {
                return res.status(404).json({ error: 'Мастер не найден' });
            }
    
            const masterFolderPath = result[0].work_examples; // Например: public/master_1
            const fullPath = path.resolve(__dirname, '..', masterFolderPath); // Получаем полный путь к папке
    
            // Проверяем, существует ли папка
            if (!fs.existsSync(fullPath)) {
                return res.status(404).json({ error: 'Папка с фото не найдена' });
            }
    
            // Получаем список файлов в папке
            const files = fs.readdirSync(fullPath);
            if (files.length === 0) {
                return res.status(404).json({ error: 'Файлы не найдены' });
            }
    
            // Строим URL для изображений
            const imageUrls = files.map(file => {
                return `${req.protocol}://${req.get('host')}/${masterFolderPath}/${file}`;
            });
    
            res.json({ imageUrls });
        } catch (error) {
            console.error('Ошибка при получении работ мастера:', error);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
    
}

module.exports = new MasterController();
