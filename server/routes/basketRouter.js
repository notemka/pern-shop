const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, basketController.getAll);
router.post('/:id', authMiddleware, basketController.addToBasket);
router.delete('/:id', authMiddleware, basketController.deleteFromBasket);

module.exports = router;
