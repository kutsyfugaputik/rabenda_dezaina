// controllers/statusController.js
const { Statuses } = require('../modules/modules'); // Импортируем модель статусов.
const ApiError = require('../error/ApiError'); // Импортируем класс для обработки ошибок API.

class StatusController {
  // Метод для получения всех статусов
  async getAll(req, res) {
    console.log('Запрос на получение всех статусов получен.'); // Логируем начало обработки запроса.

    try {
      const statuses = await Statuses.findAll(); // Извлекаем все записи из таблицы статусов.
      console.log('Список всех статусов успешно получен.'); // Логируем успешное выполнение запроса.
      return res.json(statuses); // Отправляем список статусов клиенту в формате JSON.
    } catch (error) {
      console.error('Ошибка при получении списка статусов:', error); // Логируем ошибку.
      return res.status(500).json({ message: 'Ошибка при получении списка статусов. Попробуйте позже.' }); // Отправляем сообщение об ошибке.
    }
  }

  // Метод для получения статуса по ID
  async getById(req, res, next) {
    console.log('Запрос на получение статуса по ID получен.'); // Логируем начало обработки запроса.

    const { id } = req.params; // Извлекаем параметр ID из запроса.
    console.log(`Ищем статус с ID: ${id}`); // Логируем ID, который ищется.

    try {
      const status = await Statuses.findOne({ where: { id } }); // Ищем запись статуса с указанным ID.

      if (!status) {
        console.warn(`Статус с ID ${id} не найден.`); // Логируем предупреждение, если запись не найдена.
        return next(ApiError.notFound('Статус с таким ID не найден.')); // Возвращаем ошибку 404 через middleware.
      }

      console.log(`Статус с ID ${id} успешно найден.`); // Логируем успешный поиск статуса.
      return res.json(status); // Отправляем найденный статус клиенту в формате JSON.
    } catch (error) {
      console.error('Ошибка при поиске статуса:', error); // Логируем ошибку.
      return res.status(500).json({ message: 'Ошибка при поиске статуса. Попробуйте позже.' }); // Отправляем сообщение об ошибке.
    }
  }
}

module.exports = new StatusController(); // Экспортируем экземпляр контроллера.
