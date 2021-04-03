const ApiError = require('../error/ApiError');
const { Basket, BasketGood, Good } = require('../models');

class BasketController {
  async addToBasket(req, res, next) {
    const { id } = req.params;
    const { user } = req;

    try {
      const basket = await Basket.findOne({ where: { userId: user.id } });
      const basketGood = await BasketGood.create({
        goodId: id,
        basketId: basket.id,
      });
      return res.json(basketGood);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    const userId = req.user.id;

    try {
      const { id } = await Basket.findOne({ where: { userId } });
      const basketGoods = await BasketGood.findAll({ where: { basketId: id } });

      return res.json(basketGoods);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteFromBasket(req, res, next) {
    const { id } = req.params;
    const { user } = req;
    try {
      const basket = await Basket.findOne({ where: { userId: user.id } });
      await BasketGood.destroy({ where: { goodId: id, basketId: basket.id } });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new BasketController();
