const { Masters } = require('../modules/modules');
const ApiError = require('../error/ApiError');

class MasterController {
    async create(req, res) {
        const { user_id, specialization, years_of_experience, work_examples } = req.body;
        const master = await Masters.create({ user_id, specialization, years_of_experience, work_examples });
        return res.json(master);
    }

    async Rating(req, res) {
        const { masterId } = req.params;

  try {
    const query = `
      SELECT AVG(f.rating) AS average_rating
      FROM masters m
      JOIN services s ON m.master_id = s.master_id
      JOIN requests r ON s.service_id = r.service_id
      JOIN feedback f ON r.request_id = f.request_id
      WHERE r.status_id = 3 AND m.master_id = $1
      GROUP BY m.master_id
    `;
    
    const result = await pool.query(query, [masterId]);

    if (result.rows.length > 0) {
      res.status(200).json({ masterId, averageRating: result.rows[0].average_rating });
    } else {
      res.status(404).json({ message: 'Rating not found for this master' });
    }
  } catch (error) {
    console.error('Error fetching master rating:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
    

    async getById(req, res, next) {
        const { id } = req.params;
        const master = await Masters.findOne({ where: { id } });
        if (!master) {
            return next(ApiError.notFound('Master not found'));
        }
        return res.json(master);
    }

}
module.exports = MasterController();

