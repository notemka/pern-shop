const Router = require('express');
const router = new Router();
const goodController = require('../controllers/goodController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.post('/', checkRoleMiddleware('ADMIN'), goodController.create);
router.delete('/:id', checkRoleMiddleware('ADMIN'), goodController.delete);
router.put('/:id', goodController.update);
router.get('/', goodController.getAll);
router.get('/:id', goodController.getOne);

module.exports = router;
