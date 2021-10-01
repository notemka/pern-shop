const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const { Good, GoodInfo } = require('../models');

class GoodController {
  async saveImage({ file }) {
    const { createReadStream } = await file;
    const imgName = `${uuid.v4()}.jpg`;
    const imageLocation = path.join(__dirname, `../static/${imgName}`);
    const stream = createReadStream();
    await stream.pipe(fs.createWriteStream(imageLocation));
    return imgName;
  }

  async create(data) {
    try {
      const { name, price, brandId, typeId, info, img } = data;
      const imgName = await this.saveImage(img);

      const good = await Good.create({
        name,
        price,
        img: imgName,
        brandId,
        typeId,
      });

      if (info.length) {
        await info.map(async ({ title, description }) => {
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

  async getSomeGoods(idsArray) {
    const goods = await Promise.all(idsArray.map(async (id) => await Good.findOne({ where: { id } })));
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
      const good = await Good.findOne({ where: { id } });
      const { img: goodImage } = good || {};
      if (goodImage) {
        fs.unlink(path.join(__dirname, `../static/${goodImage}`), (err) => {
          if (err) console.error(err);
        });
      }

      await GoodInfo.destroy({ where: { goodId: id } });
      await Good.destroy({ where: { id } });

      return 'Success';
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(data) {
    const { id, info, img } = data;
    let updatedData = { ...data };
    const isImageChanged = typeof img !== 'string';

    if (isImageChanged) {
      updatedData.img = await this.saveImage(img);
    }

    try {
      const oldGoodInfo = await GoodInfo.findAll({ where: { goodId: id } });

      // Find old info that doesn't exist in the new info and delete it
      const deletedInfoArr = oldGoodInfo.filter((oldItem) => !info.some((newItem) => oldItem.id === newItem.id));
      deletedInfoArr.map(async (item) => await GoodInfo.destroy({ where: { id: item.id } }));

      // Delete old data for info field of this good if new info field doesn't contain anything
      if (oldGoodInfo.length > 0 && !info.length) {
        await GoodInfo.destroy({ where: { goodId: id } });
      }

      if (info.length) {
        await info.map(async ({ id: infoId, title, description }) => {
          const isExistedData = oldGoodInfo.some((item) => item.id === infoId);

          if (isExistedData) {
            await GoodInfo.update({ title, description }, { where: { id: infoId }, returning: true });
          } else {
            await GoodInfo.create({ title, description, goodId: id });
          }
        });
      }
      const updatedGood = await Good.update({ ...updatedData }, { where: { id }, returning: true });

      return updatedGood;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new GoodController();
