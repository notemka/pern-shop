const goodController = require('../controllers/goodController');
const userController = require('../controllers/userController');
const typeController = require('../controllers/typeController');
const brandController = require('../controllers/brandController');
const basketController = require('../controllers/basketController');
const { GraphQLUpload } = require('graphql-upload');
const authMiddleware = require('../middleware/authMiddleware');
// const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const resolvers = {
  Upload: GraphQLUpload,
  checkUserAccess: async (_, context) => {
    const user = authMiddleware(context.req);
    const token = await userController.check(user);
    return token;
  },
  getAllGoods: async ({ brandId, typeId, limit, page }) => {
    const data = await goodController.getAll(brandId, typeId, limit, page);
    // data contains count and rows, example: { count: 4, rows: [...]}
    return data.rows;
  },
  getOneGood: async ({ id }) => await goodController.getOne(id),
  getGoodsDataForBasket: async ({ basketList }) => {
    const filteredBasketList = basketList.reduce((result, { goodId }) => {
      if (goodId) {
        result.push(goodId);
      }
      return result;
    }, []);
    const basketGoods = await goodController.getSomeGoods(filteredBasketList);
    return basketGoods;
  },

  getAllTypes: async () => await typeController.getAll(),
  getAllBrands: async () => await brandController.getAll(),
  getAllBasketGoods: async ({ id }) => await basketController.getAll(id),

  registerUser: async ({ email, password, role }) => await userController.registration(email, password, role),
  loginUser: async ({ email, password }) => await userController.login(email, password),

  createGood: async ({ input }, context) => {
    // checkRoleMiddleware(context.req.user);
    return await goodController.create(input, context.req, context.res);
  },
  updateGood: async ({ input }, context) => {
    // checkRoleMiddleware(context.req.user)
    return await goodController.update(input);
  },
  deleteGood: async ({ id }, context) => {
    // checkRoleMiddleware(context.req.user)
    return await goodController.delete(id);
  },

  createType: async ({ name }) => await typeController.create(name),
  updateType: async ({ input }) => await typeController.update(input),
  deleteType: async ({ id }) => await typeController.delete(id),

  createBrand: async ({ name }) => await brandController.create(name),
  updateBrand: async ({ input }) => await brandController.update(input),
  deleteBrand: async ({ id }) => await brandController.delete(id),

  addToBasket: async ({ id }, context) => {
    const user = authMiddleware(context.req);
    const basketId = user.id;
    await basketController.addToBasket(id, basketId);
  },
  deleteFromBasket: async ({ goodId }, context) => {
    const user = authMiddleware(context.req);
    await basketController.deleteFromBasket(goodId, user.id);
  },
};

module.exports = resolvers;
