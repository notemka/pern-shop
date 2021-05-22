const uuid = require('uuid');
const path = require('path');
const { Good, GoodInfo } = require('../models');

class GoodController {
  async create(data, req) {
    try {
      const { name, price, brandId, typeId, info, img } = data;
      console.log('req.files:', req);
      // const { img } = req.files;
      console.log('img:', img);
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

      return good;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll(brandId, typeId, limit, page) {
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
        include: [{ model: GoodInfo, as: 'info' }],
        limit,
        offset,
      });
    }
    return goods;
  }

  async getOne(id) {
    const good = await Good.findOne({
      where: { id },
      include: [{ model: GoodInfo, as: 'info' }],
    });
    return good;
  }

  async delete(id) {
    try {
      await Good.destroy({
        where: { id },
        include: [{ model: GoodInfo, as: 'info' }],
      });
      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(data) {
    const { id, infoTitle, infoDescription } = data;

    try {
      await Good.update(
        data,
        { where: { id } },
        { returning: true, include: [{ model: GoodInfo, as: 'info' }] }
      );

      if (data.info.length) {
        const infoArray = JSON.parse(info);
        await infoArray.map(async ({ title, description }) => {
          await GoodInfo.update(
            {
              title: infoTitle,
              description: infoDescription,
            },
            { where: { goodId: id } }
          );
        });
      }

      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new GoodController();
