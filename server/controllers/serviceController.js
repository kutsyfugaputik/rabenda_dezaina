// controllers/serviceController.js
const { Services } = require('../modules/modules'); // Импортируем модель услуг.
const ApiError = require('../error/ApiError'); // Импортируем класс для обработки ошибок API.

class ServiceController {
  // Метод для получения всех услуг
  async getAll(req, res) {
    console.log('Запрос на получение всех услуг получен.'); // Логируем начало обработки запроса.

    try {
      const services = await Services.findAll(); // Извлекаем все записи из таблицы услуг.
      console.log('Список всех услуг успешно получен.'); // Логируем успешное выполнение запроса.
      return res.json(services); // Отправляем список услуг клиенту в формате JSON.
    } catch (error) {
      console.error('Ошибка при получении списка услуг:', error); // Логируем ошибку.
      return res.status(500).json({ message: 'Ошибка при получении списка услуг' }); // Отправляем сообщение об ошибке.
    }
  }

  // Метод для получения услуги по ID
  async getById(req, res, next) {
    console.log('Запрос на получение услуги по ID получен.'); // Логируем начало обработки запроса.

    const { id } = req.params; // Извлекаем параметр ID из запроса.
    console.log(`Ищем услугу с ID: ${id}`); // Логируем ID, который ищется.

    try {
      const service = await Services.findOne({ where: { id } }); // Ищем запись услуги с указанным ID.

      if (!service) {
        console.warn(`Услуга с ID ${id} не найдена.`); // Логируем предупреждение, если запись не найдена.
        return next(ApiError.notFound('Service not found')); // Возвращаем ошибку 404 через middleware.
      }

      console.log(`Услуга с ID ${id} успешно найдена.`); // Логируем успешный поиск услуги.
      return res.json(service); // Отправляем найденную услугу клиенту в формате JSON.
    } catch (error) {
      console.error('Ошибка при поиске услуги:', error); // Логируем ошибку.
      return res.status(500).json({ message: 'Ошибка при поиске услуги' }); // Отправляем сообщение об ошибке.
    }
  }
}

module.exports = new ServiceController(); // Экспортируем экземпляр контроллера.
