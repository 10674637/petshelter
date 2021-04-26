import jwt from "jsonwebtoken";
export function generateJWT(user) {
  var tokenData = {
    username: user.username,
    id: user._id,
    role: user.role
  };
  return jwt.sign({
    user: tokenData
  }, process.env.TOKEN_SECRET);
}
export function requireLogin(req, res, next) {
  var token = decodeToken(req);

  if (!token) {
    return res.status(401).json({
      message: "you must be logged in."
    });
  }

  next();
}
export function decodeToken(req) {
  var token = req.headers.authorization || req.headers["authorization"]; //   console.log(req.headers)
  //   console.log("FUGLY")
  //   console.log(token)
  //   console.log(process.env.TOKEN_SECRET)

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
}
export function getUsername(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.username;
}
export function getUserId(req) {
  var token = decodeToken(req);

  if (!token) {
    return null;
  }

  return token.user.id;
}