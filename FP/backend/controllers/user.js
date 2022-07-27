const { ObjectID } = require("bson");
const UserSchema = require("../util/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = "mysecretcode";

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let responses = await UserSchema.findOne({ email });
    const validPassword = await bcrypt.compare(password, responses.password);

    console.log(responses);

    if (validPassword) {
      const token = jwt.sign(
        {
          id: responses._id,
          email: responses.email,
          name: responses.name,
          role: responses.role,
        },
        secret
      );
      return res.status(200).json({
        payload: token,
        user: responses,
      });
    } else {
      return next({ statusCode: 401, message: "not valid" });
    }
  } catch (err) {
    next({ statusCode: 500, message: err });
  }
};

exports.signup = async (req, res, next) => {
  try {
    console.log(req.body);

    const { password, name, email, role, phone } = req.body;
    const userExist = await UserSchema.findOne({ email });
    console.log(userExist);

    if (!userExist) {
      const pwd = await bcrypt.hash(password, 10);
      const user = { name, email, password: pwd, role, phone };
      const newUser = new UserSchema(user);
      const result = await newUser.save(user);
      return res.status(201).json({ success: true, payload: result });
    } else {
      return next({ statusCode: 401, message: "User email must be unique" });
    }
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    const result = await UserSchema.find(
      {},
      { _id: 1, name: 1, email: 1, role: 1, active: 1 }
    );
    if (result.length !== 0)
      return res.status(200).json({ success: true, payload: result });
    return res.status(204).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const _id = new ObjectID(req.params.id);
    const result = await UserSchema.findOne(
      { _id },
      { _id: 1, name: 1, email: 1, role: 1, active: 1 }
    );
    return res.status(200).json({ success: true, payload: result });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
exports.authorize = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const jwtToken = token.split(" ")[1];
      const data = jwt.verify(jwtToken, secret);
      console.log("data: " + data);
      req.user = data;
      next();
    } else {
      return next({ statusCode: 401, message: "unauthorize" });
    }
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.authorizeSeller = (req, res, next) => {
  try {
    console.log(req.user.role);
    if (req.user.role === "seller") {
      next();
    } else {
      return next({ statusCode: 401, message: "unauthorize" });
    }
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return next({ statusCode: 401, message: "unauthorize" });
    }
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
