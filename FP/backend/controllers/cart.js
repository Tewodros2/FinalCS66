const { ObjectID } = require("bson");
const CartSchema = require("../util/cart");
const ProductSchema = require("../util/product");

exports.getAllProductInCart = async (req, res, next) => {
  try {
    const result = await CartSchema.find({});
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    next({ statusCode: 500, message: err });
  }
};
exports.getByProductId = async (req, res, next) => {
  console.log(req.params.productId);
  try {
    const productId = new ObjectID(req.params.productId);
    const result = await CartSchema.find({ productId });
    if (!result) return next({ statusCode: 400, message: "product not found" });
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.getCarts = async (req, res, next) => {
  try {
    const userId = new ObjectID(req.user.id);

    const result = await CartSchema.find({ userId });

    console.log(result);

    if (!result) return next({ statusCode: 400, message: "cart not found" });
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.addProductToCart = async (req, res, next) => {
  try {
    const { products } = req.body;
    const { cartId } = req.params;

    const carts = await CartSchema.findById(new ObjectID(cartId));

    const populatedProducts = [];

    for (let i = 0; i < products.length; i++) {
      let data = await ProductSchema.findById(
        new ObjectID(products[i].productId)
      );
      populatedProducts.push({
        ...data.toObject(),
        quantity: products[i].quantity,
      });
    }

    const result = await CartSchema.findByIdAndUpdate(new ObjectID(cartId), {
      $set: { products: [...carts.products, ...populatedProducts] },
    });

    return res.status(201).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    console.log(req.body);
    const { cartId, ProductId } = req.body;
    const found = await CartSchema.findById(new ObjectID(cartId));
    if (found) {
      await CartSchema.findByIdAndUpdate(new ObjectID(cartId), {
        adopted: true,
      });
      await req.db.updateOne(
        { _id: new ObjectID(ProductId) },
        {
          $set: {
            adopted: true,
          },
        }
      );
      return res.status(201).json({ success: true, payload: {} });
    }
    return res
      .status(404)
      .json({ success: false, message: "Product in cart not found" });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const data = {
      userId: req.user.id,
    };

    const found = await CartSchema.findOne({ userId: req.user.id });

    if (found) {
      return res.status(200).json({ success: true, payload: found });
    }

    const created = await CartSchema.create(data);

    return res.status(200).json({ success: true, payload: created });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.checkout = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const result = await CartSchema.findByIdAndUpdate(new ObjectID(cartId), {
      $set: { status: "CHECKOUT" },
    });

    if (!result) return next({ statusCode: 400, message: "cart not found" });

    return res.status(201).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
