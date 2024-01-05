const { Sequelize, DataTypes, Model } = require("@sequelize/core");
const {
  Attribute,
  PrimaryKey,
  AutoIncrement,
  allowNull,
} = require("@sequelize/core/decorators-legacy");

const sequelize = new Sequelize("sqlite::memory:", {
  models: [User, Product],
});

class Product extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  @allowNull
  id;

  @Attribute(DataTypes.STRING)
  title;

  @Attribute(DataTypes.STRING)
  imageUrl;

  @Attribute(DataTypes.STRING)
  description;

  @belongsTo(() => User, { constraints: true, onDelete: "CASCADE" })
  user;
}

class User extends Model {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  id;

  @allowNull
  @Attribute(DataTypes.STRING)
  name;

  @Attribute(DataTypes.STRING)
  email;

  @HasMany(() => Product)
  product;
}

module.exports = User;

module.exports = Product;
