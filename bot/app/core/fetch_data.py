import logging
import requests

# Настройка логирования
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Функция для получения данных из API
def fetch_data(url):
    """
    Загружает данные из API по указанному URL.
    """
    logging.info(f'Запрос к API по адресу: {url}')
    
    try:
        response = requests.get(url)
        
        if response.status_code == 200:
            logging.info(f'Данные успешно загружены с {url}')
            return response.json()
        else:
            logging.error(f'Ошибка загрузки данных с {url}. Код: {response.status_code}')
            return []
    except requests.exceptions.RequestException as e:
        logging.error(f'Ошибка запроса к {url}: {e}')
        return []
