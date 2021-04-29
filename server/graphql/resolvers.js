const goodController = require('../controllers/goodController');
const userController = require('../controllers/userController');
const typeController = require('../controllers/typeController');
const brandController = require('../controllers/brandController');
const basketController = require('../controllers/basketController');

const resolvers = {
  checkUserAccess: async ({ input }) => await userController.check(input),

  getAllGoods: async ({ brandId, typeId, limit, page }) => {
    const data = await goodController.getAll(brandId, typeId, limit, page);
    // data contains count and rows, example: { count: 4, rows: [...]}
    return data.rows;
  },
  getOneGood: async ({ id }) => await goodController.getOne(id),

  getAllTypes: async () => await typeController.getAll(),
  getAllBrands: async () => await brandController.getAll(),
  getAllBasketGoods: async ({ id }) => await basketController.getAll(id),

  registerUser: async ({ email, password, role }) =>
    await userController.registation(email, password, role),
  loginUser: async ({ email, password }) =>
    await userController.login(email, password),

  createGood: async ({ input }) => await goodController.create(input),
  updateGood: async ({ input }) => await goodController.update(input),
  deleteGood: async ({ id }) => await goodController.delete(id),

  createType: async ({ name }) => await typeController.create(name),
  updateType: async ({ id }) => await typeController.update(id),
  deleteType: async ({ id }) => await typeController.delete(id),

  createBrand: async ({ name }) => await brandController.create(name),
  updateBrand: async ({ id }) => await brandController.update(id),
  deleteBrand: async ({ id }) => await brandController.delete(id),

  addToBasket: async ({ input }) => await basketController.addToBasket(input),
  deleteFromBasket: async ({ input }) =>
    await basketController.deleteFromBasket(input),
};

module.exports = resolvers;
