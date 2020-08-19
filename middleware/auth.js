const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
  // Get token from request header
  const token = request.header("x-auth-token");

  // Check if token exists
  if (!token)
    return response.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded.user;

    next();
  } catch (error) {
    response.status(401).json({ msg: "Token isn't valid." });
  }
};
