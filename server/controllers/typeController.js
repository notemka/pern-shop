const { Type } = require('../models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(_req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Type.destroy({ where: { id } });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TypeController();
