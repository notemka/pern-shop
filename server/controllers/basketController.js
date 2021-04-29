const { Basket, BasketGood } = require('../models');

class BasketController {
  async addToBasket(id, userId) {
    try {
      const basket = await Basket.findOne({ where: { userId } });
      const basketGood = await BasketGood.create({
        goodId: id,
        basketId: basket.id,
      });
      return basketGood;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAll(basketId) {
    try {
      const basketGoods = await BasketGood.findAll({
        where: { basketId },
      });

      return basketGoods;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFromBasket(id, basketId) {
    try {
      await BasketGood.destroy({ where: { goodId: id, basketId } });
      return 'Success';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new BasketController();
