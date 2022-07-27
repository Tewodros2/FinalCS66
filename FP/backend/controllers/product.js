const { ObjectID } = require("bson");
const ProductSchema = require("../util/product");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await ProductSchema.find({});

    console.log(result);
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
exports.getProductById = async (req, res, next) => {
  try {
    const result = await ProductSchema.findOne({ _id: req.params.productId });
    if (!result) return next({ statusCode: 400, message: {} });
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.createProduct = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, category, picture, description, quantity, price } = req.body;

    const result = await ProductSchema.create(req.body);
    if (!result) return next({ statusCode: 400, message: {} });
    return res.status(200).json({
      success: true,
      payload: req.body,
    });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, category, picture, description, quantity, price } = req.body;
    const result = await ProductSchema.updateOne(
      { _id: req.params.productId },
      {
        $set: {
          name,
          category,
          picture,
          description,
          quantity,
          price,
        },
      }
    );

    if (result.modifiedCount === 0)
      return next({ statusCode: 400, message: {} });
    return res.status(200).json({ success: true, payload: { _id: productId } });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await ProductSchema.deleteOne({ _id: req.params.productId });
    if (result.deletedCount === 0)
      return next({ statusCode: 400, message: {} });
    return res.status(200).json({ success: true, payload: { _id } });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
