const jwt = require("jsonwebtoken");
const config = require("../config/secret");

function verification(role) {
  return function (req, rest, next) {
    // return rest.status(401).send({ auth: false, message: role });
    // CEK AUTHORIZATION
    var tokenWithBearer = req.headers.authorization;
    if (tokenWithBearer) {
      var token = tokenWithBearer.split(" ")[1];
      // VERIFICATION
      jwt.verify(token, config.secret, function (rows, decoded) {
        if (rows) {
          return rest
            .status(401)
            .send({ auth: false, message: "Token Invalid" });
        } else {
          if (role == 2) {
            req.auth = decoded;
            next();
          } else {
            return rest
              .status(401)
              .send({ auth: false, message: "Not Authorized" });
          }
        }
      });
    } else {
      return rest.status(401).send({ auth: false, message: "Token Invalid" });
    }
  };
}

module.exports = verification;
