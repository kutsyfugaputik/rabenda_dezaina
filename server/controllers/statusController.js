const { Statuses } = require('../modules/modules'); // Импортируем модель статусов.
const ApiError = require('../error/ApiError'); // Импортируем класс для обработки ошибок API.
const logAction = require('../utils/logger'); // Импортируем функцию логирования действий.

class StatusController {
  // Метод для получения всех статусов
  async getAll(req, res, next) {
    logAction('📥 Запрос на получение всех статусов'); // Логируем начало запроса

    try {
      const statuses = await Statuses.findAll(); // Получаем все записи из таблицы статусов

      logAction(`✅ Получено ${statuses.length} статусов`); // Лог успешного получения
      return res.json(statuses); // Отправляем список статусов клиенту
    } catch (error) {
      logAction(`❌ Ошибка при получении статусов: ${error.message}`, '🚨'); // Лог ошибки
      return next(ApiError.internal('Ошибка при получении списка статусов. Попробуйте позже.')); // Пробрасываем ошибку
    }
  }

  // Метод для получения конкретного статуса по ID
  async getById(req, res, next) {
    logAction('🔍 Запрос на получение статуса по ID'); // Лог начала запроса

    const { status_id } = req.params; // Извлекаем ID из параметров запроса
    logAction(`🔎 Поиск статуса с ID: ${status_id}`); // Логируем ID для поиска

    try {
      const status = await Statuses.findOne({ where: { status_id } }); // Поиск записи по ID

      if (!status) {
        logAction(`⚠️ Статус с ID ${status_id} не найден`); // Лог если не найден
        return next(ApiError.notFound('Статус с таким ID не найден.')); // Ошибка 404
      }

      logAction(`✅ Статус найден: ${JSON.stringify(status)}`); // Лог успешного поиска
      return res.json(status); // Возвращаем найденный статус
    } catch (error) {
      logAction(`❌ Ошибка при поиске статуса: ${error.message}`, '🚨'); // Лог ошибки
      return next(ApiError.internal('Ошибка при поиске статуса. Попробуйте позже.')); // Пробрасываем ошибку
    }
  }
}

module.exports = new StatusController(); // Экспортируем экземпляр контроллера
