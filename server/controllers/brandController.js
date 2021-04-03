const { Brand } = require('../models');
const ApiError = require('../error/ApiError');

class BrandController {
  async create(req, res) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      console.log(error);
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(_req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Brand.destroy({ where: { id } });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BrandController();
