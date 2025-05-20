import logging  # Импортируем модуль для логирования
import requests  # Импортируем модуль для выполнения HTTP-запросов

# Настройка логирования: уровень DEBUG (для вывода всех сообщений) и формат сообщений
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Функция для получения данных из API
def fetch_data(url):
    """
    Загружает данные из API по указанному URL.
    """
    logging.info(f'Запрос к API по адресу: {url}')  # Записываем информацию о начале запроса
    
    try:
        response = requests.get(url)  # Выполняем GET-запрос по указанному URL
        
        if response.status_code == 200:  # Проверяем, что код ответа равен 200 (успех)
            logging.info(f'Данные успешно загружены с {url}')  # Если запрос успешен, записываем это в лог
            return response.json()  # Возвращаем данные в формате JSON
        else:
            logging.error(f'Ошибка загрузки данных с {url}. Код: {response.status_code}')  # Если код ответа не 200, записываем ошибку в лог
            return []  # Возвращаем пустой список при ошибке
    except requests.exceptions.RequestException as e:  # Обрабатываем все исключения, связанные с запросами
        logging.error(f'Ошибка запроса к {url}: {e}')  # Записываем ошибку запроса в лог
        return []  # Возвращаем пустой список при ошибке запроса
