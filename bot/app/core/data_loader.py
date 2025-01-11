import logging
from app.core.fetch_data import fetch_data
from app.core.models import User, Master

# URL для API
URL_USERS = 'http://localhost:5000/api/users'
URL_MASTERS = 'http://localhost:5000/api/masters'

# Настройка логирования
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

def load_data():
    logging.info('Начало загрузки данных')

    # Загружаем данные с сервера
    users_data = fetch_data(URL_USERS)
    masters_data = fetch_data(URL_MASTERS)

    if not users_data or not masters_data:
        logging.error('Ошибка загрузки данных с сервера')
        return [], []

    logging.info('Данные успешно загружены с сервера')

    try:
        # Преобразуем в объекты
        users = {user['user_id']: User(
            user['user_id'], user['first_name'], user['last_name'], user['father_name']
        ) for user in users_data}

        masters = [Master(
            master['user_id'], master['specialization'], master['years_of_experience'], master['tg_uid']
        ) for master in masters_data]

        logging.info('Данные успешно преобразованы в объекты')

    except Exception as e:
        logging.error(f'Ошибка при преобразовании данных: {e}')
        return [], []

    return users, masters
