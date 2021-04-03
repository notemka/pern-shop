const User = require('./User');
const Basket = require('./Basket');
const BasketGood = require('./BasketGood');
const Good = require('./Good');
const Type = require('./Type');
const Brand = require('./Brand');
const Rating = require('./Rating');
const GoodInfo = require('./GoodInfo');
const TypeBrand = require('./TypeBrand');

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketGood);
BasketGood.belongsTo(Basket);

Type.hasMany(Good);
Good.belongsTo(Type);

Brand.hasMany(Good);
Good.belongsTo(Brand);

Good.hasMany(Rating);
Rating.belongsTo(Good);

Good.hasMany(BasketGood);
BasketGood.belongsTo(Good);

Good.hasMany(GoodInfo, { as: 'info' });
GoodInfo.belongsTo(Good);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketGood,
  Good,
  Type,
  Brand,
  Rating,
  TypeBrand,
  GoodInfo,
};
