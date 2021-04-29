const { Type } = require('../models');

class TypeController {
  async create(name) {
    const type = await Type.create({ name });
    return type;
  }

  async getAll() {
    const types = await Type.findAll();
    return types;
  }

  async delete(id) {
    try {
      await Type.destroy({ where: { id } });
      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new TypeController();
