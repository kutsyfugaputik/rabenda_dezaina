import logging  # Импортируем модуль для логирования
from app.core.fetch_data import fetch_data  # Импортируем функцию для получения данных из API
from app.core.models import User, Master  # Импортируем классы User и Master
# URL для API
URL_USERS = 'http://localhost:5000/api/users'  # Адрес для получения данных о пользователях
URL_MASTERS = 'http://localhost:5000/api/masters'  # Адрес для получения данных о мастерах
# Настройка логирования: уровень DEBUG и формат сообщений с временем, уровнем и сообщением
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
# Функция для загрузки и обработки данных
def load_data():
    logging.info('Начало загрузки данных')  # Записываем в лог, что началась загрузка данных
    # Загружаем данные с сервера
    users_data = fetch_data(URL_USERS)  # Получаем данные о пользователях
    masters_data = fetch_data(URL_MASTERS)  # Получаем данные о мастерах
    # Проверка, что данные были успешно получены
    if not users_data or not masters_data:
        logging.error('Ошибка загрузки данных с сервера')  # Записываем ошибку в случае неудачной загрузки
        return [], []  # Возвращаем пустые списки в случае ошибки
    logging.info('Данные успешно загружены с сервера')  # Записываем в лог успешную загрузку данных
    try:
        # Преобразуем загруженные данные в объекты
        users = {user['user_id']: User(  # Создаем словарь пользователей с user_id как ключ
            user['user_id'], user['first_name'], user['last_name'], user['father_name']
        ) for user in users_data}
        masters = [Master(  # Создаем список объектов мастеров
            master['user_id'], master['specialization'], master['years_of_experience'], master['tg_uid']
        ) for master in masters_data]
        logging.info('Данные успешно преобразованы в объекты')  # Записываем в лог успешное преобразование данных
    except Exception as e:
        logging.error(f'Ошибка при преобразовании данных: {e}')  # Записываем ошибку в случае сбоя преобразования
        return [], []  # Возвращаем пустые списки в случае ошибки преобразования
    return users, masters  # Возвращаем словарь пользователей и список мастеров
