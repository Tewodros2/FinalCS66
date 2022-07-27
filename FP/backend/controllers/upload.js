exports.upload = (req, res, next) => {
  try {
    return res.status(200).json({
      payload: {
        picture: req.file.filename,
      },
    });
  } catch (err) {
    return next({ statusCode: 500, message: err });
  }
};
