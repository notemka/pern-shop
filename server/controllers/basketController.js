const { Basket, BasketGood, Good } = require('../models');

class BasketController {
  async addToBasket(id, userId) {
    try {
      const basket = await Basket.findOne({ where: { userId } });
      const addedGood = await BasketGood.findOne({
        where: { goodId: id, basketId: basket.id },
      });
      if (addedGood) {
        throw new Error('Данный товар уже в корзине!');
      }

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

  async deleteFromBasket(goodId, userId) {
    try {
      // to know which user to remove this good from
      const basket = await Basket.findOne({ where: { userId } });

      await BasketGood.destroy({
        where: { goodId, basketId: basket.id },
      });
      return 'Good deleted successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new BasketController();
