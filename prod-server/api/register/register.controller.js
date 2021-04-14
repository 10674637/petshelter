import e from 'cors';
import { StringUtil } from '../../Utilities/string-util.js';
import User from '../../model/user-model.js';
export function index(req, res) {
  var validation = validateIndex(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  var user = new User({
    username: req.body.username,
    password: req.body.password,
    first: req.body.first,
    last: req.body.last
  });
  user.save(function (error) {
    if (error) {
      if (error.code === 11000) {
        return res.status(403).json({
          message: 'Username is already taken.'
        });
      }

      console.error(error);
      return res.sendStatus(500);
    }

    return res.status(201).json();
  });
}

function validateIndex(body) {
  var errors = '';

  if (StringUtil.isEmpty(body.username)) {
    errors += 'Username is required.';
  }

  if (StringUtil.isEmpty(body.password)) {
    errors += 'Password is required.';
  }

  if (StringUtil.isEmpty(body.first)) {
    errors += 'First name is required.';
  }

  if (StringUtil.isEmpty(body.last)) {
    errors += 'Last name is required.';
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  };
}