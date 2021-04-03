const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const goodRouter = require('./goodRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const basketRouter = require('./basketRouter');

router.use('/user', userRouter);
router.use('/goods', goodRouter);
router.use('/types', typeRouter);
router.use('/brands', brandRouter);
router.use('/basket', basketRouter);

module.exports = router;
