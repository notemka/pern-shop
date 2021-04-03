const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// принимает колбек с параметрами request и response
router.post('/registration', userController.registation);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
