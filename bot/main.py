import asyncio
import os
import logging
from aiogram import Bot, Dispatcher
from app.handlers import router  # Убедитесь, что папка app содержит файл __init__.py

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Загружаем переменные окружения вручную
def load_env_file(file_path=".env"):
    if os.path.exists(file_path):
        with open(file_path) as f:
            for line in f:
                key, _, value = line.strip().partition("=")
                os.environ[key] = value
        logger.info(f"Переменные окружения загружены из файла {file_path}.")
    else:
        logger.warning(f"Файл {file_path} не найден. Переменные окружения не загружены.")

# Загрузка переменных окружения из файла .env (если файл существует)
load_env_file()

# Получаем токен из переменных окружения
BOT_TOKEN = os.getenv("BOT_TOKEN")

if not BOT_TOKEN:
    logger.error("Токен бота не задан. Убедитесь, что BOT_TOKEN находится в переменных окружения или файле .env.")
    raise ValueError("Токен бота не задан. Убедитесь, что BOT_TOKEN находится в переменных окружения или файле .env.")

async def main():
    # Создаем экземпляры Bot и Dispatcher
    logger.info("Создание экземпляров Bot и Dispatcher...")
    bot = Bot(token=BOT_TOKEN)
    dp = Dispatcher()

    # Подключаем маршрутизатор
    dp.include_router(router)
    logger.info("Маршрутизатор подключен.")

    # Запускаем бота
    try:
        logger.info("Запуск бота...")
        await dp.start_polling(bot)
    except Exception as e:
        logger.error(f"Ошибка при запуске бота: {e}")
    finally:
        await bot.session.close()
        logger.info("Соединение с ботом закрыто.")

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Работа бота прекращена пользователем!")
