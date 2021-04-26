import { StringUtil } from '../../Utilities/string-util.js';
import User from '../../model/user-model.js';
import { generateJWT } from '../../services/auth-service.js';
export function index(req, res) {
  var validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  User.findOne({
    username: req.body.username.toLowerCase()
  }, function (error, user) {
    if (error) {
      return res.status(500).json();
    }

    if (!user) {
      return res.status(401).json();
    }

    var passwordsMatch = User.passwordMatches(req.body.password, user.password);

    if (!passwordsMatch) {
      return res.status(401).json();
    }

    var token = generateJWT(user);
    return res.status(200).json({
      token: token
    });
  });
}

function validateIndex(body) {
  var errors = '';

  if (StringUtil.isEmpty(body.username)) {
    errors += "Username is required.";
  }

  if (StringUtil.isEmpty(body.password)) {
    errors += "Password is required.";
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}