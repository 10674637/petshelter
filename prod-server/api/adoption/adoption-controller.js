function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import adoption from '../../model/adoption-model.js';
import * as auth from '../../services/auth-service.js'; //gget the picture from the front-end and save in the database

export function create(req, res) {
  //create post
  var object = req.body;
  object.author = auth.getUserId(req);
  var adoptionObj = new adoption(object);
  adoptionObj.save(function (error) {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      message: "Saved successfully!"
    });
  });
} //display 

export function show(req, res) {
  //get post by id
  adoption.findOne({
    _id: req.params.id
  }, function (error, adoption) {
    if (error) {
      return res.status(500).json({
        message: "No data found!"
      });
    }

    return res.status(200).json({
      adoption: adoption
    });
  });
}
export function showAll(req, res) {
  adoption.find({}, function (error, adoption) {
    if (error) {
      return res.status(500).json({
        message: "No data found!"
      });
    }

    return res.status(200).json({
      adoption: adoption
    });
  });
} //delete by from datase

export function remove(req, res) {
  adoption.deleteOne({
    _id: req.params.id
  }, function (error) {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      message: "Deleted successfully!"
    });
  });
}
export function search(req, res) {
  var query = {
    petType: {
      $regex: req.body.petType,
      $options: "i"
    },
    location: {
      $regex: req.body.location,
      $options: "i"
    }
  };
  adoption.find(query, function (error, adoption) {
    if (error) {
      return res.status(500).json({
        message: "No data found!"
      });
    }

    return res.status(200).json({
      adoption: adoption
    });
  });
}
export function update(req, res) {
  adoption.findByIdAndUpdate(req.params.id, _objectSpread({}, req.body), {
    new: true
  }, function (error) {
    if (error) {
      return res.status(500).json();
    }

    return res.status(200).json({
      message: "Updated successfully!"
    });
  });
}