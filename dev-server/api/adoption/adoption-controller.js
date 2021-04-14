import adoption from '../../model/adoption-model.js';
import * as auth from '../../services/auth-service.js';


//gget the pic ture from the front-end and save in the database
export function create(req, res) {
    //create post
    var object = req.body;
    object.author = auth.getUserId(req);
    var adoptionObj = new adoption(object);    
    adoptionObj.save(function (error) {
      if (error) {
        return res.status(500).json();
      }
      return res.status(200).json({message:"Saved successfully!"});
  });
}


//display 
export function show(req, res) {
  //get post by id
  adoption.findOne({
    _id: req.params.id
  }, function (error, adoption) {
    if (error) {
      return res.status(500).json({message:"No data found!"});
    }

    return res.status(200).json({
      adoption: adoption
    });
  });
}

export function showAll(req, res) {
  adoption.find({}, function (error, adoption) {
    if (error) {
      return res.status(500).json({message:"No data found!"});
    }

    return res.status(200).json({
      adoption: adoption
    });
  });
}