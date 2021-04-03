const uuid = require('uuid');
const path = require('path');
const { Good, GoodInfo } = require('../models');
const ApiError = require('../error/ApiError');

class GoodController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const fileName = `${uuid.v4()}.jpg`;
      // path.resolve() - адаптирует указанный путь к ОС
      // параметр '..' переход на папку выше
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const good = await Good.create({
        name,
        price,
        img: fileName,
        brandId,
        typeId,
      });

      if (info) {
        const infoArray = JSON.parse(info);
        await infoArray.map(async ({ title, description }) => {
          await GoodInfo.create({
            title,
            description,
            goodId: good.id,
          });
        });
      }
      console.log('Good:', good);

      return res.json(good);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    let goods;
    page = page || 1;
    limit = limit || 10;
    const offset = limit * page - limit;

    if (!brandId && !typeId) {
      goods = await Good.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      goods = await Good.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (brandId && !typeId) {
      goods = await Good.findAndCountAll({ where: { brandId }, limit, offset });
    }
    if (brandId && typeId) {
      goods = await Good.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(goods);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const good = await Good.findOne({
      where: { id },
      include: [{ model: GoodInfo, as: 'info' }],
    });
    res.json(good);
  }

  async delete(req, res, next) {
    const { id } = req.params;

    try {
      await Good.destroy({
        where: { id },
        include: [{ model: GoodInfo, as: 'info' }],
      });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    console.log(req.body);

    try {
      await Good.update({
        ...req.body,
        returning: true,
        where: { id },
        include: [{ model: GoodInfo, as: 'info' }],
      });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GoodController();
