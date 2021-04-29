const { Brand } = require('../models');

class BrandController {
  async create(name) {
    try {
      const brand = await Brand.create({ name });
      return brand;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll() {
    const brands = await Brand.findAll();
    return brands;
  }

  async delete(id) {
    try {
      await Brand.destroy({ where: { id } });
      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new BrandController();
