const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    req.userData = decode;
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth Failed" });
  }
};
