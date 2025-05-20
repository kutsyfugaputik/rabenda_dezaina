class User:
    def __init__(self, user_id, first_name, last_name, father_name):
        self.user_id = user_id  # Присваиваем идентификатор пользователя
        self.first_name = first_name  # Присваиваем имя пользователя
        self.last_name = last_name  # Присваиваем фамилию пользователя
        self.father_name = father_name  # Присваиваем отчество пользователя

    def full_name(self):
        return f"{self.last_name} {self.first_name} {self.father_name}"  # Возвращаем полное имя в формате "Фамилия Имя Отчество"


class Master:
    def __init__(self, user_id, specialization, years_of_experience, tg_uid):
        self.user_id = user_id  # Присваиваем идентификатор пользователя
        self.specialization = specialization  # Присваиваем специализацию мастера
        self.years_of_experience = years_of_experience  # Присваиваем количество лет опыта мастера
        self.tg_uid = tg_uid  # Присваиваем идентификатор в Telegram
