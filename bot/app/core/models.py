class User:
    def __init__(self, user_id, first_name, last_name, father_name):
        self.user_id = user_id  # user_id, а не id
        self.first_name = first_name
        self.last_name = last_name
        self.father_name = father_name

    def full_name(self):
        return f"{self.last_name} {self.first_name} {self.father_name}"


class Master:
    def __init__(self, user_id, specialization, years_of_experience, tg_uid):
        self.user_id = user_id
        self.specialization = specialization
        self.years_of_experience = years_of_experience
        self.tg_uid = tg_uid
