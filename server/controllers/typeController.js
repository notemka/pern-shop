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

  async update(data) {
    console.log(data);
    try {
      await Type.update(data, { where: { id: data.id } }, { returning: true });
      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
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
