const { Masters } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class masterController {
    async create(req, res) {
        const { user_id, specialization, years_of_experience, work_examples } = req.body;
        const master = await Masters.create({ user_id, specialization, years_of_experience, work_examples });
        return res.json(master);
    }

    
    async  getAverageRating(req, res) {
      const userId = req.user.id;
      
      try {
        const master = await Master.findOne({ where: { user_id: userId } });
        if (!master) {
          return res.status(404).json({ message: 'Мастер не найден' });
        }
    
        const requests = await master.getRequests({ include: ['feedback'] });
        const ratings = requests.map(req => req.feedback?.rating).filter(rating => rating != null);
    
        const averageRating = ratings.length ? ratings.reduce((sum, rate) => sum + rate, 0) / ratings.length : 'нет оценки';
        
        res.json({ averageRating });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка сервера' });
      }
    }
    
   }
module.exports = new masterController();

