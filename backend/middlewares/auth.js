const { verifyJWT } = require("../utils/jwt");

const auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.status(401).json({ message: "Token is not valid" });
    return;
  }
  try {
    const decoded = await verifyJWT(token);
    res.locals.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
