const jwt = require("jsonwebtoken");
const dataToSnakeCase = require("../lib/data_to_snake_case");
const { apiResponse } = require("../lib/ResponseController");

const AuthenticateToken = (req, res, next) => {
  const auth = req.header("Authorization");

  try {
    const [type, token] = auth.split(" ");

    if (type !== "Bearer") throw new Error("Invalid Token");

    if (!token) throw new Error("Unauthorized");

    jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new Error("Token expired please re-login");
        } else {
          throw new Error("Forbidden");
        }
      }

      req.user = user;
      next();
    });
  } catch (error) {
    res.send(
      dataToSnakeCase(
        apiResponse({
          isSuccess: false,
          statusCode: 200,
          message: error.message,
          error: error,
        })
      )
    );
  }
};

module.exports = AuthenticateToken;
