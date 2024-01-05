const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
// const Product1 = require("./models/user1.js");
// const User1 = require("./models/user1.js");
// const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Dupa.belongsTo(User1, { constraints: true, onDelete: "CASCADE" });
// User1.hasMany(Dupa);
// User1.hasOne(Cart);
// Cart.belongsTo(User1);
// Cart.belongsToMany(Dupa, { through: CartItem });
// Dupa.belongsToMany(Cart, { through: CartItem });

async () => {
  await sequelize.sync({ force: true });
  console.log("All models were synchronized successfully.");
};

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if (!user) {
      return User1.create({ name: "Max", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
